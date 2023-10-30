import { Moment } from 'moment';

import { Person } from './People';

export interface Entrance {
  id: number;
  date: Moment;
  person: Person;
}
