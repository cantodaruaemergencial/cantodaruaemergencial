import { Moment } from 'moment';

export interface Gender {
  id: number;
  Gender: string;
}

export interface SkinColor {
  id: number;
  SkinColor: string;
}

export interface MaritalStatus {
  id: number;
  MaritalStatus: string;
}

export interface SchoolTraining {
  id: number;
  SchoolTraining: string;
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
  Name: string;
  SocialName: string;
  MotherName: string;
  BirthDate: string;
  BirthPlace: string;
  HomelessTime: string;
  gender: Gender;
  GeneralRegister: string;
  Childrens: number;
  HasHabitation: boolean;
  HasEmergencyAid: boolean;
  HasPbhBasket: boolean;
  HasUniqueRegister: boolean;
  HasGeneralRegister: boolean;
  HasCpf: boolean;
  Cpf: string;
  HasCtps: boolean;
  HasBirthCertificate: boolean;
  // marital_status: MaritalStatus;
  // school_training: SchoolTraining;
  ReferenceLocation: string;
  Occupation: string;
  Profession: string;
  ContactPhone: string;
  ReferenceAddress: string;
  Demands: string;
  Observation: string;
  // skin_color: SkinColor;
  CardNumber: string;
}

export interface BasePerson {
  Id: number;
  Name: string;
  SocialName: string;
  CardNumber: string;
  LastEntranceDate?: Moment | null;
  EnteredToday: boolean;
}
