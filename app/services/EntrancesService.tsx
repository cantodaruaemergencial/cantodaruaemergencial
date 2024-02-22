import { Api } from '#/packages/api/strapi';
import { Entrance } from '#/types/Entrance';
import { BasePerson } from '#/types/People';

class EntrancesService {
  static post = async (person: BasePerson) => {
    const body = {
      assisted_person: [person.id],
      entrance_date: new Date(),
    };

    return Api.post<Entrance>('assisted-person-entrances', body);
  };
}

export default EntrancesService;
