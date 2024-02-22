export interface PastoralDeRuaServiceAttendance {
  id: number;
  needs_conversation: boolean;
  needs_call_details: string;
  needs_health_details: string;
  needs_food: boolean;
  needs_work_details: string;
  needs_house: boolean;
  needs_temporary_home: boolean;
  needs_document: boolean;
  needs_shelter: boolean;
  needs_hygiene_care: boolean;
  needs_other_details: string;
  comment_pastoral_attendance: string;
  attendance_date: Date;
  assisted_person: number;
  user: number;
}
