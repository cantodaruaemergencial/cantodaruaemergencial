import { Association } from './Associations';

export interface UserData {
  id: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  registrationToken?: string;
  isActive: boolean;
  associations: Association[];
}

export interface AuthAdmin {
  data: {
    token: string;
    user: UserData;
  };
}

export interface AuthLocal {
  jwt: string;
  user: UserData;
}
