import { RegisterOptions } from 'react-hook-form';

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
}

export interface FormField {
  property: string;
  label: string;
  description?: string;
  type: FieldType;
  value?: string | string[] | number;
  options?: FormFieldOption[];
  rules?: RegisterOptions;
  dateConfig?: DateConfig;
  inputConfig?: InputConfig;
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
