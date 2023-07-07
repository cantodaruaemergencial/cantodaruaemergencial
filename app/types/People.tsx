import { Moment } from 'moment';

export interface GeneralOption {
  id: number;
  name: string;
}

export interface Benefit {
  id: number;
  benefit: string;
}

export interface ExternalService {
  id: number;
  ExternalService: string;
}

export interface Person {
  id: number;
  Preferential: boolean;
  name: string;
  social_name: string;
  mother_name: string;
  father_name: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  occupation: string;
  email: string;
  phone_number: string;
  birth_document_number: string;
  wedding_document_number: string;
  rg_document_number: string;
  cpf_document_number: string;
  reservist_document_number: string;
  voter_registration_document_number: string;
  cnh_document_number: string;
  ctps_document_number: string;
  nis_document_number: string;
  caduni_document_number: string;
  has_govbr_registration: boolean;
  marital_status: GeneralOption;
  self_declaration: GeneralOption;
  gender: GeneralOption;
  sexual_orientation: GeneralOption;
  child_quantity: number;
  child_care_person: string;
  comment_person: string;
  card_number: string;
  created_at: string;
  created_by: string;
}

export interface BasePerson {
  Id: number;
  Preferential: boolean;
  Name: string;
  SocialName: string;
  CardNumber: string;
  LastEntranceDate?: Moment | null;
  EnteredToday: boolean;
}

export interface Education {
  id: number;
  is_currently_studying: boolean;
  study_degree: GeneralOption;
  is_interested_returning_study: boolean;
  has_extra_course: boolean;
  is_interested_doing_some_course: boolean;
  desired_extra_course: string;

  id_person: number;

  created_at: string;
  created_by: string;
}

export interface Culture {
  exercises_practiced: string;
  exercises_quantity_by_week: number;
  know_some_cultural_place: boolean;
  usually_go_to_some_culture_place: boolean;
  went_somewhere_place_last_twelve_months: boolean;
  has_reading_habit: boolean;
  has_listening_music_habit: boolean;
  has_drawing_habit: boolean;
  other_habit: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface HealthSituation {
  self_health_evaluation: string;
  date_last_medical_appointment: Date;
  date_last_medical_dentist: Date;
  use_medication_often: boolean;
  medication_details: string;
  was_hospitalized_last_twelve_months: boolean;
  hospitalized_reason: string;
  time_hospitalized_days: number;
  did_any_surgery: string;
  has_vaccination_card: boolean;
  is_updated_vaccination_covid19: boolean;
  is_updated_vaccination_hepatite: boolean;
  is_updated_vaccination_tetano: boolean;
  is_updated_vaccination_influenza: boolean;
  is_updated_vaccination_febre_amarela: boolean;
  questions_regarding_physical_or_mental_health: string;
  do_some_follow_up: string;
  use_alcohol_or_other_drugs: string;
  drugs_frequency: GeneralOption;
  has_ever_been_admitted_to_therapeutic_community: string;
  need_dental_care: boolean;
  describe_dental_care: string;
  need_psychological_care: boolean;
  describe_psychological_care: string;
  need_psychiatric_care: boolean;
  describe_psychiatric_care: string;
  other_specific_care: string;
  has_any_disabilities: string;
  describe_need_special_equipment: string;
  has_any_comorbidities_hipertensao: boolean;
  has_any_comorbidities_diabetes: boolean;
  has_any_comorbidities_cardiovascular_problem: boolean;
  has_any_comorbidities_depression: boolean;
  has_any_comorbidities_asma: boolean;
  has_any_comorbidities_cancer: boolean;
  has_any_comorbidities_none: boolean;
  has_any_comorbidities_other: string;
  man_health_last_prostate_exam_date: Date;
  man_health_last_ist_exam_date: Date;
  woman_health_last_preventive_exam_date: Date;
  woman_health_last_mammography_exam_date: Date;
  woman_health_last_gynecological_consultation_exam_date: Date;
  woman_health_suspected_pregnancy_week_quantity: number;
  woman_health_use_some_contraceptive_method: boolean;
  use_condom: boolean;
  comment_health_situation: boolean;
  id_person: number;
  created_at: string;
  created_by: string;
}

export interface JudicialSituation {
  has_already_been_through_the_socioeducational_system: boolean;
  has_already_been_through_the_prision_system: boolean;
  has_an_active_lawsuit: boolean;
  has_outstanding_writ_of_execution: boolean;
  wear_anklet: boolean;
  is_accompanied_by_a_defender: boolean;
  is_this_follow_up_enough: boolean;
  comment_judicial_situation: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface Infrastructure {
  has_access_to_clean_water: boolean;
  has_access_to_adequate_toilets: boolean;
  has_access_to_a_bed: boolean;
  has_access_to_safety_spot: boolean;
  place_of_stay_has_adequate_hygiene: boolean;
  place_of_stay_has_adequate_structure: boolean;
  place_of_stay_has_proximity_to_basic_services: boolean;
  place_of_stay_has_adequate_sound_condition: boolean;
  has_any_furniture: boolean;
  comment_infrastructure: string;
  id_person: number;
  created_at: string;
  created_by: string;
}

export interface Safety {
  quantity_victim_of_crimes_against_property_last_three_months: number;
  quantity_victim_of_crimes_against_person_last_three_months: number;
  quantity_victim_of_institutional_violence_last_three_months: number;
  comment_safety: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface StreetPath {
  is_currently_homeless: boolean;
  time_homeless: number;
  homeless_reason: string;
  had_any_family_ties_interrupted_quantity: number;
  already_been_in_shelter_quantity_months: number;
  already_been_in_hostel_quantity_months: number;
  time_lived_in_bh_months: number;
  lived_on_streets_in_another_city: string;
  any_family_member_have_been_homeless: string;
  reason_past_street_path_unemployment: boolean;
  reason_past_street_path_family_problems: boolean;
  reason_past_street_path_drugs: boolean;
  reason_past_street_path_comment: string;
  time_past_street_path: number;
  comment: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface WorkAndIncome {
  already_has_paid_work: boolean;
  describe_past_paid_work: string;
  work_type: GeneralOption;
  participate_in_any_income_generation_projects: boolean;
  what_is_being_done_to_get_out_of_this_situation: string;
  retirement_benefit_value: number;
  continuing_provision_benefit_value: number;
  sick_pay_benefit_value: number;
  bolsa_familia_benefit_value: number;
  brazil_financial_assistance_benefit_value: number;
  other_benefit_value: number;
  family_average_monthly_income_value: number;
  past_work_category: GeneralOption;
  past_work_sector: GeneralOption;
  comment_work_and_income: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface FamilyReferences {
  description: string;
  comment_family_references: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface SocialAssistanceNetwork {
  is_attended_to_a_network_services: boolean;
  has_crea_service: boolean;
  has_cras_service: boolean;
  has_shelter_service: boolean;
  has_council_of_rights_service: boolean;
  has_health_service: boolean;
  has_education_service: boolean;
  has_pastoral_povo_da_rua_service: boolean;
  comment_social_assistance_network: string;
  id_person: number;

  created_at: string;
  created_by: string;
}

export interface PersonVacancyReservationBenefit {
  vacancy_reservation_benefit: GeneralOption;
  details_person_vacancy_reservation_benefit: string;
  id_person: number;

  created_at: string;
}

export interface PersonCompleteData {
  culture: Culture;
  education: Education;
  familyReferences: FamilyReferences;
  healthSituation: HealthSituation;
  infrastructure: Infrastructure;
  judicialSituation: JudicialSituation;
  personVacancyReservationBenefit: PersonVacancyReservationBenefit;
  safeties: Safety;
  socialAssistanceNetwork: SocialAssistanceNetwork;
  streetPaths: StreetPath;
  workAndIncomes: WorkAndIncome;
}
