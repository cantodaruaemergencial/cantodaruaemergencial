import { Entrance } from './Entrance';
import { PastoralDeRuaServiceAttendance } from './PastoralServiceAttendance';

export interface PersonHistory {
  attendances: PastoralDeRuaServiceAttendance[];
  entrances: Entrance[];
}
