import { Moment } from 'moment';

import { Format } from './Format';

export type DashboardToday = {
  entrances: number;
};

export type DashboardTotalByCategory = {
  name: string;
  total: number;
};

export type DashboardTotalByCategoryAndHistoric = {
  name: string;
  total: number;
  monthTotal: number;
  weekTotal: number;
  icon?: string;
};

export interface DashboardTotalByCategoryAndAverage {
  average: number;
  totalByCategory: DashboardTotalByCategory[];
}

export type DashboardTotal = {
  total: number;
  monthTotal?: number;
  weekTotal?: number;
  totalByCategory?: DashboardTotalByCategory[];
};

export type DashboardCardOtherValue = {
  label: string;
  value: number;
};

export type DashboardCardHistoricalValue = {
  date: Moment;
  value: number;
};

export type DashboardCard = {
  label: string;
  value: number;
  format?: Format;
  historicalValues?: DashboardCardHistoricalValue[] | null;
  otherValues?: DashboardCardOtherValue[] | null;
};

export type DashboardTotalHistoricalListCard = {
  label: string;
  values: DashboardTotalByCategoryAndHistoric[];
};

export type DashboardChartCard = {
  label: string;
  description?: string | null;
  average?: number;
  values: DashboardTotalByCategory[];
};

export type DashboardData = {
  people: DashboardCard;
  entrances: DashboardCard;
  serviceAttendances: DashboardCard;
  services: DashboardTotalHistoricalListCard;
  genders: DashboardChartCard;
  skinColors: DashboardChartCard;
  ages: DashboardChartCard;
  homelessness: DashboardChartCard;
  schoolTrainings: DashboardChartCard;
};
