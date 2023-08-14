export interface PastoralDeRuaServiceAttendance {
  needs_conversation: boolean;
  describe_needs_call: string;
  describe_needs_health: string;
  describe_needs_food: boolean;
  describe_needs_work: string;
  needs_house: boolean;
  needs_temporary_home: boolean;
  needs_documents: boolean;
  needs_shelter: boolean;
  needs_hygiene_care: boolean;
  describe_needs_others: string;
  comment: string;
  service_attendance_date: Date;
  person: number;
  user: number;
}
