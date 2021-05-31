import { Api } from '#/packages/api/strapi';
import { Entrance } from '#/types/Entrance';
import { BasePerson } from '#/types/People';

class EntrancesService {
  static post = async (person: BasePerson) => {
    const body = {
      person: person.Id,
      DateTime: new Date(),
    };

    return Api.post<Entrance>('/person-entrances', body);
  };
}

export default EntrancesService;
