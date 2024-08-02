export interface Buyer {
    id: string; //Mudar para String (Guid na API)
    name: string;
    email: string;
    phone: string;
    date: string;
    document: string;
    stateRegistration: string;
    personType: string;
    gender?: string;
    birthDate: Date;
    blocked: boolean;
    exempt: boolean;
    password?: string;
    confirmPassword?: string;
    createdAt: Date;
  }