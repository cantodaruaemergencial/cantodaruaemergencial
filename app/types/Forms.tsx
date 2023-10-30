import { Moment } from 'moment';
import { RegisterOptions } from 'react-hook-form';
import { PersonCompleteData } from './People';

export enum FieldType {
  input,
  boolean,
  date,
  select,
  selectMultiple,
  number,
}

interface DateConfig {
  disableFuture: boolean;
}

interface InputConfig {
  maxLength?: number;
  minLength?: number;
}

export interface FormField {
  property: string;
  label: string;
  description?: string;
  type: FieldType;
  value?: string | string[] | number | number[] | Moment | boolean | null;
  options?: FormFieldOption[];
  rules?: RegisterOptions;
  dateConfig?: DateConfig;
  inputConfig?: InputConfig;
  disabled?: boolean;
}

export interface FormFieldOption {
  label: string;
  value: number;
}

export interface FormSection {
  label: string;
  fields: FormField[];
}

export interface Form {
  sections: FormSection[];
}

export interface FormAndPersonData extends Form {
  personCompleteData?: PersonCompleteData;
}
