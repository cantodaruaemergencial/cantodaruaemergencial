import { isMoment, Moment } from 'moment';
import { Api } from '#/packages/api/strapi';
import { FieldType, FormSection } from '#/types/Forms';
import {
  AttendanceType,
  ServiceAttendanceOnDatabase,
} from '#/types/Attendances';

class AttendancesService {
  static getAttendancesForm = () => {
    const sections: FormSection[] = [
      {
        label: 'Serviços Semanais',
        fields: [
          {
            label: 'Data',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.Date,
            ),
            rules: {
              required: true,
            },
            type: FieldType.date,
          },
          {
            label: 'Banheiro Feminino Banho',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.FemaleBath,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Feminino Sanitário',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.FemaleRestroom,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Masculino Banho',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.MaleBath,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Masculino Sanitário',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.MaleRestroom,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Enfermagem',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.Nursing,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Guarda Volume',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.Lockers,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Lanche',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.Snack,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Lavanderia',
            property: AttendancesService.AttendanceEnumToString(
              AttendanceType.Laundry,
            ),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
        ],
      },
    ];

    return { sections };
  };

  static AttendanceEnumToString = (whichAttendance: AttendanceType): string => {
    return AttendanceType[whichAttendance];
  };

  static mappingPropertyToAAttendance = (value: string) => {
    switch (value) {
      case AttendanceType[AttendanceType.FemaleBath]:
        return AttendanceType.FemaleBath;
      case AttendanceType[AttendanceType.FemaleRestroom]:
        return 'Banheiro Feminino Sanitário';
      case AttendanceType[AttendanceType.MaleBath]:
        return 'Banheiro Masculino Banho';
      case AttendanceType[AttendanceType.MaleRestroom]:
        return 'Banheiro Masculino Sanitário';
      case AttendanceType[AttendanceType.Laundry]:
        return 'Lavanderia';
      case AttendanceType[AttendanceType.Lockers]:
        return 'Guarda Volume';
      case AttendanceType[AttendanceType.Snack]:
        return 'Lanche';
      case AttendanceType[AttendanceType.Nursing]:
        return 'Enfermagem';
      default:
        return '';
    }
  };

  static createAttendanceObjectToSave = (
    date: Date,
    value: string,
    quantity: string,
  ): ServiceAttendanceOnDatabase => {
    return {
      Service: AttendancesService.mappingPropertyToAAttendance(value),
      Date: date,
      Attendances: parseInt(quantity, 10),
      State: 'Published',
    };
  };

  static saveAttendancesByDay = async (formData: {
    [key: string]: unknown;
  }): Promise<string> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });
    console.log('body', body);

    let response = [];
    Object.keys(body).forEach(async (key) => {
      if (key !== 'Date') {
        const objBody = AttendancesService.createAttendanceObjectToSave(
          new Date(body.Date.toString()),
          key,
          body[key],
        );

        response.push(
          await Api.post<ServiceAttendanceOnDatabase>(
            'service-attendances',
            objBody,
          ),
        );
      }
    });
    // console.log('testeeee', teste);
    // const saveMethod = Api.post<Person>('/service-attendances', body);

    // const { status, data } = await saveMethod;

    // if (status !== 200) throw new Error();

    return 'haha';
  };
}

export default AttendancesService;
