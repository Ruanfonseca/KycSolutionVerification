
export interface UserData {
  fullName?: string;
  cpf?: string;
  birthDate?: string;
  referenceImg?: string | File ; 
  fatherUrl?: string;
  front?: string | File;        
  back?: string | File;         
}


export interface VerifyInDatabasePayload {
  cpf: string;
  referenceImage: string;
}

export interface VerificationResult {
  documentApproved: boolean;
  facialApproved: boolean;
  pepApproved: boolean;
  message: string;
}

// Equivalente ao KycFacialValidationDTO do backend
export interface FacialValidationDTO {
  approved: boolean;
  message: string;
}

export interface KycResponseDTO {
  id: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  message?: string;
  createdAt: string;
  pepStatus?: boolean;
  documentData?: {
    name?: string;
    number?: string;
    expiryDate?: string;
    issuingAuthority?: string;
    documentType?: string;
  }
}

// Equivalente ao KycUserDocumentDTO do backend
export interface UserDocumentDTO {
  name: string | null;
  approved: boolean;
  message: string;
  birthDate: string;
  cpf: string;
  documentTittle?: string;
  dType?: number;
}

// Equivalente ao KycPepValidationDTO do backend
export interface PepValidationDTO {
  approved: boolean;
  message: string;
  functions: string[]; // Lista de funções políticas encontradas
}

// Equivalente ao KycResponseDTO do backend
export interface KycResponseDTO {
  userDocumentDTO: UserDocumentDTO;
  facialValidationDTO: FacialValidationDTO;
  pepValidationDTO: PepValidationDTO;
}

// Equivalente ao KycRegisterUserPayloadDTO do backend
export interface KycRegisterPayload {
  username: string;
  cpf: string;
  birthDate: string;
  referenceImage: string; // Imagem codificada em base64
  type: 'cnh' | 'document'; // Tipo de verificação
  verificationMethod?: VerificationMethod; // Método de verificação opcional
  front:string;
  back:string;
}

export type VerificationMethod = 'regular' | 'faceLiveness' | 'rekognition';

// Interface para comunicação com iframe
export interface IframeMessage {
  name?: string;
  fullName?: string;
  cpf?: string;
  birthDate?: string;
  dataNascimento?: string;
}

// Interface para comunicação de resultados para o pai
export interface KycResultMessage {
  type: 'KYC_VERIFICATION_COMPLETE';
  data: KycResponseDTO | null;
}

// Interfaces do Regula Document Reader baseadas na documentação
export interface RegulaOneCandidateDTO {
  dType: number;
  dDescription: string;
}

export interface RegulaTextDTO {
  fullName: string;
  birthDate: string;
  documentNumber: string;
}

export interface RegulaAuthenticityCheckDTO {
  hasImageDocument: boolean; // Se o documento possui uma imagem
  percentValue: number; // Percentual de similaridade para correspondência facial
}

export interface RegulaContainer {
  oneCandidateDTO: RegulaOneCandidateDTO;
  regulaTextDTO: RegulaTextDTO;
  authenticityCheckListDTO: RegulaAuthenticityCheckDTO;
}

export interface RegulaResponse {
  ContainerList: RegulaContainer;
  status: string;
  statusCode: number;
}

// Opções para upload e captura de documento
export type DocumentCaptureMethod = 'mobile' | 'camera' | 'upload' | 'options';




//pep interfaces
export interface PepFunction {
  code: number;
  description: string;
}

export interface PepOrgan {
  code: number;
  description: string;
  address: string;
}

export interface PepMandate {
  function: PepFunction;
  appointmentDate: string;
  exonerationDate: string;
  reasonExoneration: string;
  organ: PepOrgan;
}

export interface PepAssociate {
  document: string;
  dateBirth: string;
  name: string;
  relationship: string;
}

export interface PepRelative {
  document: string;
  name: string;
  bond: string;
}

export interface PepData {
  name: string;
  document: string;
  typeIndicator: string;
  pepIndicator: string;
  dateBirth: string;
  hasMandatesPermission: boolean;
  hasAssociatePermission: boolean;
  hasRelativePermission: boolean;
  messageMandatesPermission: string;
  messageAssociatePermission: string;
  messageRelativePermission: string;
  mandates: PepMandate[];
  associates: PepAssociate[];
  relatives: PepRelative[];
}

export interface Enrichment {
  document: string;
  pep: PepData;
}

export interface ResponseWebService{
  approved:Boolean 
  message:String 
  enrichments?: Enrichment[];

}

