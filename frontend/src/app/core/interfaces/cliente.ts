export interface Cliente {
  id?: number;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phoneNumber: number;
  email: string;
  registrationDate?: string;
  estado?: string;
}
