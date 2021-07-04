import { Api } from '#/packages/api/strapi';

class ReportsService {
  static getMonthly = (month: string, year: string) =>
    Api.getFile(`reports/monthly?month=${month}&year=${year}`, `mensal-${month}-${year}.csv`);
}

export default ReportsService;