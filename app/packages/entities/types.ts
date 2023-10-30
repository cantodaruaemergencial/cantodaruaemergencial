import { Association } from '#/types/Associations';

export interface UserProfile {
  id: number;
  displayName: string;
  email: string;
  token: string;
  associations: Association[];
}
