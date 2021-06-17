export enum AttendanceType {
  Lockers = 15,
  Snack = 16,
  FemaleRestroom = 17,
  Nursing = 18,
  Laundry = 19,
  FemaleBath = 20,
  MaleRestroom = 22,
  MaleBath = 23,
  Date = 0,
}

export interface ServiceAttendanceOnDatabase {
  Id?: number;
  service: number;
  Date: Date;
  Attendances: number;
}
