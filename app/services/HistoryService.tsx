import { Api } from '#/packages/api/strapi';
import { PersonHistory } from '#/types/PersonHistory';

class HistoryService {
  static get = (personId: number) => {
    return Api.get<PersonHistory>(`assisted-person-history/${personId}`).then(
      (res) => res.data,
    );
  };
}

export default HistoryService;
