
import { KycRegisterPayload, KycResponseDTO, ResponseWebService, UserData, VerifyInDatabasePayload } from "@/types/kyc";
import { toast } from "@/components/ui/use-toast";
import { base64ToBlob, blobToFile, stripBase64Prefix } from "@/utils/formatters";

// URL base da API KycBet
export const API_BASE_URL = import.meta.env.VITE_URL;


/**
 * Função para verificar a vivacidade facial do usuário
 * Integra com o método facialValidation do KycBetService
 * @param cpf CPF do usuário
 * @param referenceImage Imagem de referência em base64
 * @returns Resultado da validação facial
 */
export const verifyFacialLivenessMock = async (payload: UserData): Promise<ResponseWebService> => {
  try {
    if (payload.cpf === "17192891746") {
      return {
        approved: false,
        message: "Esse Usuário é Pep",
        enrichments: [
          {
            document: "17192891746",
            pep: {
              name: "RUAN FONSECA",
              document: "17192891746",
              typeIndicator: "TITULAR",
              pepIndicator: "S",
              dateBirth: "1931-09-03",
              hasMandatesPermission: true,
              hasAssociatePermission: true,
              hasRelativePermission: true,
              messageMandatesPermission: "Não possui o pacote contratado",
              messageAssociatePermission: "Não possui o pacote contratado",
              messageRelativePermission: "Não possui o pacote contratado",
              mandates: [
                {
                  function: {
                    code: 159,
                    description: "DEPUTADO FEDERAL"
                  },
                  appointmentDate: "2011-02-01",
                  exonerationDate: "2017-11-14",
                  reasonExoneration: "EXONERAÇÃO A PEDIDO",
                  organ: {
                    code: 12021,
                    description: "CÂMARA DOS DEPUTADOS",
                    address: "CÂMARA DOS DEPUTADOS"
                  }
                }
              ],
              associates: [
                {
                  document: "00058572287",
                  dateBirth: "1935-12-21",
                  name: "RUAN FONSECA",
                  relationship: "POSSÍVEL RELACIONADO"
                }
              ],
              relatives: [
                {
                  document: "44153683019",
                  name: "MARIA SILVA",
                  bond: "POSSÍVEL MÃE"
                }
              ]
            }
          }
        ]
      } as ResponseWebService & {
        enrichments: any[];
      };
    }

    return {
      approved: true,
      message: "Não consta como PEP.",
      enrichments: []
    };
  } catch (error) {
    console.error("Erro na verificação facial:", error);
    return {
      approved: null,
      message: "Erro ao processar verificação facial.",
      enrichments: []
    };
  }
};

export const verifyindatabase = async (payload: { cpf: string; referenceImage: File;userName:string }) => {
  try {
    const formData = new FormData();
    formData.append("cpf", payload.cpf);
    formData.append("referenceImage", payload.referenceImage);

    const response = await fetch(`${API_BASE_URL}/api/suporte/facialValidation`, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      console.warn("Erro controlado da API:", json.message);
      return { error: true, message: json.message };
    }

    return { data: json.data };
  } catch (error) {
    console.error("Erro de rede ou exceção não tratada:", error);
    toast({
      title: "Erro na verificação",
      description: "Ocorreu um erro ao validar dados no banco. Por favor, tente novamente.",
      variant: "destructive"
    });
    return { error: true, message: "Erro inesperado" };
  }
};



export const registerUser = async (payload: UserData) => {
  const base64Payload: any = {
    username: payload.fullName, 
    cpf: payload.cpf,
    birthDate: payload.birthDate,
  };

  if (typeof payload.front === "string") {
    base64Payload.documentBytesFront = stripBase64Prefix(payload.front);
  }

  if (typeof payload.back === "string") {
    base64Payload.documentBytesBack = stripBase64Prefix(payload.back);
  }

  if (typeof payload.referenceImg === "string") {
    base64Payload.referenceImage = stripBase64Prefix(payload.referenceImg);
  }


  const response = await fetch(`${API_BASE_URL}/api/suporte/kycRegisterUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(base64Payload),
  });

  const result = await response.json();
  return result;
};

