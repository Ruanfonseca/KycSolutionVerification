// Implementing the missing validateUserData function
import { UserData } from "@/types/kyc";


export const validateCPF = (cpf: string): boolean => {
  const cleanedCPF = cpf.replace(/\D/g, '');
  
  if (cleanedCPF.length !== 11) {
    return false;
  }
  
  // CPF cannot be all the same digits
  if (/^(\d)\1{10}$/.test(cleanedCPF)) {
    return false;
  }
  
  // Validate the check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cleanedCPF.charAt(9))) {
    return false;
  }
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  return remainder === parseInt(cleanedCPF.charAt(10));
};

export const validateDate = (date: string): boolean => {
  // Format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!regex.test(date)) {
    return false;
  }
  
  const parts = date.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  // Check if date is valid
  const dateObj = new Date(year, month - 1, day);
  
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() + 1 !== month ||
    dateObj.getDate() !== day
  ) {
    return false;
  }
  
  // Check if date is not in the future and person is at least 18 years old
  const now = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(now.getFullYear() - 18);
  
  return dateObj <= eighteenYearsAgo;
};

export const formatDateForAPI = (date: string): string => {
  // Check if format is DD/MM/YYYY
  if (date.includes('/')) {
    const parts = date.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }
  
  // Return as is if already in YYYY-MM-DD format
  return date;
};



export const validateUserData = (userData: UserData): boolean => {
  // Validate fullName (at least two names, minimum 5 characters)
  if (!userData.fullName || 
      userData.fullName.trim().length < 5 || 
      !userData.fullName.trim().includes(' ')) {
    return false;
  }
  
  // Validate CPF
  if (!validateCPF(userData.cpf)) {
    return false;
  }
  
  
  return true;
};
