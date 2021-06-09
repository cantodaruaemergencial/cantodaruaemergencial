export enum AttendanceType {
  Lockers,
  Snack,
  FemaleRestroom,
  Nursing,
  Laundry,
  FemaleBath,
  MaleRestroom,
  MaleBath,
  Date,
}

export interface ServiceAttendanceOnDatabase {
  Id?: number;
  Service: string | number;
  Date: Date;
  Attendances: number;
  State: string;
}
