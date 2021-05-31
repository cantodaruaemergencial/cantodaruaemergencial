export interface UserData {
  id: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  registrationToken?: string;
  isActive: boolean;
}

export interface Auth {
  data: {
    token: string;
    user: UserData;
  };
}
