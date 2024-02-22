import { Association } from './Associations';

export interface Volunteer {
  id: number;
  username: string;
  email: string;
  associations: Association[];
}
