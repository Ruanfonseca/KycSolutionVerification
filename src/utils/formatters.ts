
export function isValidCpf(cpf: string): boolean {
  // Remove pontuação
  const cpfClean = cpf.replace(/[^\d]+/g, '');

  // Verifica se tem 11 dígitos ou se todos são iguais (ex: 111.111.111-11)
  if (cpfClean.length !== 11 || /^(\d)\1{10}$/.test(cpfClean)) return false;

  const solveDigit = (cpfParcial: string, pesoInicial: number): number => {
    let soma = 0;
    for (let i = 0; i < cpfParcial.length; i++) {
      soma += parseInt(cpfParcial.charAt(i)) * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const digit1 = solveDigit(cpfClean.substring(0, 9), 10);
  const digit2 = solveDigit(cpfClean.substring(0, 9) + digit1, 11);

  return (
    digit1 === parseInt(cpfClean.charAt(9)) &&
    digit2 === parseInt(cpfClean.charAt(10))
  );
}

export function isValidDate(date: string): boolean {
    // Expressão regular para verificar o formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica se a data corresponde ao padrão e se é uma data válida
    if (!regex.test(date)) {
        return false;
    }

    const [year, month, day] = date.split('-').map(Number);

    // Verifica se o mês é válido (1-12)
    if (month < 1 || month > 12) {
        return false;
    }

    // Verifica se o dia é válido com base no mês
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * 
 * @param name 
 * 
 * O nome deve ter pelo menos dois elementos (nome e sobrenome).
   Cada palavra no nome deve começar com uma letra maiúscula e ser composta apenas por letras.
   O nome completo pode incluir múltiplos sobrenomes ou partes do nome, mas deve conter pelo menos o primeiro nome e o último nome.
   "ana maria" 
   "Carlos Silva" 
   "maria clara"

 * @return boolean 
 */
export function isValidFullName(name: string): boolean {
    const trimmedName = name.trim().replace(/\s+/g, ' ');

    const nameParts = trimmedName.split(' ');

    // Verifica se há ao menos duas partes
    if (nameParts.length < 2) {
        return false;
    }

    // Verifica se cada parte contém apenas letras (sem acentos, números ou símbolos)
    const validPartPattern = /^[a-zA-Z]+$/;

    return nameParts.every(part => validPartPattern.test(part));
}



export const formatDateString = (date: string): string => {
  // Convert from YYYY-MM-DD to DD/MM/YYYY
  if (!date) return '';
  
  // If the date is already in DD/MM/YYYY format
  if (date.includes('/')) {
    return date;
  }
  
  const parts = date.split('-');
  if (parts.length !== 3) return date;
  
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const parseURLParams = (): {
  fatherUrl: string; name?: string, cpf?: string, birthDate?: string 
} => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
    return {
    name: params.nome || params.name || params.fullName || params.fullname || '',
    cpf: params.cpf || params.documento || params.document || '',
    birthDate: params.dataNascimento || params.birthDate || params.data || params.date || '',
    fatherUrl:params.fatherUrl
  };
};

export const setupIframeMessageListener = (callback: (data: {
  fatherUrl: string; name?: string, cpf?: string, birthDate?: string 
}) => void) => {
  window.addEventListener('message', (event) => {
    const { name, cpf, birthDate, dataNascimento, fullName,fatherUrl } = event.data || {};
    
    if (name || cpf || birthDate || dataNascimento || fullName) {
      callback({
        name: fullName || name || '',
        cpf: cpf || '',
        birthDate: dataNascimento || birthDate || '',
        fatherUrl:fatherUrl
      });
    }
  });
};

// Função para converter base64 em Blob
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeType });
};

// Função para converter Blob em File
export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

export const stripBase64Prefix = (base64: string) => {
  return base64.replace(/^data:.*;base64,/, '');
};