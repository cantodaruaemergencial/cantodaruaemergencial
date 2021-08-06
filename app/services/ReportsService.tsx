import { Api } from '#/packages/api/strapi';

class ReportsService {
  static getMonthly = (month: string, year: string) =>
    Api.getFile(`reports/monthly?month=${month}&year=${year}`, `mensal-${month}-${year}.csv`);

  static getPeople = (from: string, to: string) =>
    Api.getFile(`reports/people?from=${from}&to=${to}`, `pessoas-${from}-${to}.csv`);
}

export default ReportsService;