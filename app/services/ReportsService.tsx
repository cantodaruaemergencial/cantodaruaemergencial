import { Api } from '#/packages/api/strapi';

class ReportsService {
  static getPeople = () =>
    Api.getFile('reports/people');
}

export default ReportsService;