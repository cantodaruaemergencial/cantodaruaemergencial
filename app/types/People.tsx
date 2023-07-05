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
  Name: string;
  SocialName: string;
  MotherName: string;
  FatherName: string;
  BirthDate: string;
  BirthPlace: string;
  Nationality: string;
  Occupation: string;
  Email: string;
  ContactPhone: string;
  BirthDocument: string;
  WeddingDocument: string;
  RgDocument: string;
  CpfDocument: string;
  ReservistDocument: string;
  VoterRegistrationDocument: string;
  CnhDocument: string;
  CtpsDocument: string;
  NisDocument: string;
  CadUniDocument: string;
  HasGovBrRegistration: boolean;
  Marital_status: GeneralOption;
  SelfDeclaration: GeneralOption;
  Gender: GeneralOption;
  SexualOrientation: GeneralOption;
  ChildQuantity: number;
  ChildCarePerson: string;
  Comment: string;
  CardNumber: string;
  CreatedAt: string;
  CreatedBy: string;
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
  Id: number;
  IsCurrentlyStudying: boolean;
  StudyDegree: GeneralOption;
  IsInterestedReturningStudying: boolean;
  HasExtraCourse: boolean;
  IsInterestedToDoSomeCourse: boolean;
  DesiredExtraCourse: string;

  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface Culture {
  ExercisesPraticed: string;
  ExercisesQuantityByWeek: number;
  KnowSomeCulturalPlace: boolean;
  UsuallyGoToSomeCulturalPlace: boolean;
  WentSomewherePlaceLast12Months: boolean;
  HasReadingHabit: boolean;
  HasListeningMusicHabit: boolean;
  HasDrawingHabit: boolean;
  OtherHabit: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface HealthSituation {
  SelfHealthEvaluation: string;
  DateLastMedicalAppointment: Date;
  DateLastMedicalDentist: Date;
  UseMedicationOften: boolean;
  MedicationDetails: string;
  WasHospitalizedLastTwelveMonths: boolean;
  HospitalizedReason: string;
  TimeHospitalizedReasonDays: number;
  DidAnySurgery: string;
  HasVaccinationCard: boolean;
  IsUpdatedVaccinationCovid19: boolean;
  IsUpdatedVaccinationHepatite: boolean;
  IsUpdatedVaccinationTetano: boolean;
  IsUpdatedVaccinationInfluenza: boolean;
  IsUpdatedVaccinationFebreAmarela: boolean;
  QuestionsRegardingPhysicalOrMentalHealth: string;
  DoSomeFollowUp: string;
  UseAlcoholOrOtherDrugs: string;
  DrugsFrequency: GeneralOption;
  HasEverBeenAdmittedToTherapeuticCommunity: string;
  NeedDentalCare: boolean;
  DescribeDentalCare: string;
  NeedPsychologicalCare: boolean;
  DescribePsychologicalCare: string;
  NeedPsychiatricCare: boolean;
  DescribePsychiatricCare: string;
  OtherSpecificCare: string;
  HasAnyDisabilities: string;
  DescribeNeedSpecialEquipment: string;
  HasAnyCommorbitiesHipertensao: boolean;
  HasAnyCommorbitiesDiabetes: boolean;
  HasAnyCommorbitiesCardiovascularProblem: boolean;
  HasAnyCommorbitiesDepression: boolean;
  HasAnyCommorbitiesAsma: boolean;
  HasAnyCommorbitiesCancer: boolean;
  HasAnyCommorbitiesNone: boolean;
  HasAnyCommorbitiesOther: string;
  MenHealthLastProstateExamDate: Date;
  MenHealthLastIstExamDate: Date;
  WomanHealthLastPreventiveExamDate: Date;
  WomanHealthLastMammographyExamDate: Date;
  WomanHealthLastGynecologicalConsultationExamDate: Date;
  WomanHealthSuspectedPregnancyWeekQuantity: number;
  WomanHealthUseSomeContraceptiveMethod: boolean;
  UseCondom: boolean;
  Comment: boolean;
  IdPerson: number;
  CreatedAt: string;
  CreatedBy: string;
}

export interface JudicialSituation {
  HasAlreadyBeenThroughTheSocioeducationalSystem: boolean;
  HasAlreadyBeenThroughThePrisionSystem: boolean;
  HasAnActiveLawsuit: boolean;
  HasAnOutstandingWritOfExecution: boolean;
  WearAnklet: boolean;
  IsAccompaniedByADefender: boolean;
  IsThisFollowUpEnough: boolean;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface Infrastructure {
  HasAccessToCleanWater: boolean;
  HasAccessToAdequateToilets: boolean;
  HasAccessToABed: boolean;
  HasAccessToSafetySpot: boolean;
  PlaceOfStayHasAdequateHygiene: boolean;
  PlaceOfStayHasAdequateStructure: boolean;
  PlaceOfStayHasProximityToBasicServices: boolean;
  PlaceOfStayHasAdequateSoundCondition: boolean;
  HasAnyFurniture: boolean;
  Comment: string;
  IdPerson: number;
  CreatedAt: string;
  CreatedBy: string;
}

export interface Safety {
  VictimOfCrimesAgainstPropertyLastThreeMonths: number;
  VictimOfCrimesAgainstPersonLastThreeMonths: number;
  VictimOfInstitucionalViolenceLastThreeMonths: number;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface StreetPath {
  IsCurrentlyHomeless: boolean;
  TimeHomeless: number;
  HomelessReason: string;
  HadAnyFamilyTiesInterrupted: number;
  AlreadyBeenInShelter: number;
  AlreadyBeenInHostel: number;
  TimeLivedInBH: number;
  LivedOnTheStreetsInAnotherCity: string;
  AnyFamilyMemberHaveBeenHomeless: string;
  ReasonPastStreetPathUnemployment: boolean;
  ReasonPastStreetPathFamilyProblems: boolean;
  ReasonPastStreetPathDrugs: boolean;
  ReasonPastStreetPathComment: string;
  TimePastStreetPath: number;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface WorkAndIncome {
  AlreadyHasAPaidWork: boolean;
  DescribePastPaidWork: string;
  DoYouCurrentlyWork: GeneralOption;
  ParticipateInAnyIncomeGenerationProjects: boolean;
  WhatIsBeingDoneToGetOutOfThisSituation: string;
  RetirementBenefitValue: number;
  ContinuingProvisionBenefitValue: number;
  SickPayBenefitValue: number;
  BolsaFamiliaBenefitValue: number;
  BrazilFinancialAssistanceBenefitValue: number;
  OtherBenefitValue: number;
  FamilysAverageMonthlyIncome: number;
  CategoryPastPaidWork: GeneralOption;
  SectorPastPaidWork: GeneralOption;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface FamilyReferences {
  Description: string;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface SocialAssistanceNetwork {
  IsAttendedToANetworkServices: boolean;
  HasCREAService: boolean;
  HasCRASService: boolean;
  HasShelterService: boolean;
  HasCouncilOfRightsService: boolean;
  HasHealthService: boolean;
  HasEducationService: boolean;
  HasPastoralDeRuaService: boolean;
  Comment: string;
  IdPerson: number;

  CreatedAt: string;
  CreatedBy: string;
}

export interface PersonVacancyReservationBenefit {
  VacancyReservationBenefit: GeneralOption;
  Details: string;
  IdPerson: number;

  CreatedAt: string;
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
