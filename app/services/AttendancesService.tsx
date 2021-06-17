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
        label: 'Atendimentos diários',
        fields: [
          {
            label: 'Data de referência',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.Date),
            value: null,
            type: FieldType.date,
            dateConfig: { disableFuture: true },
            rules: {
              required: true,
            },
          },
          {
            label: 'Banheiro Feminino Banho',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.FemaleBath),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Feminino Sanitário',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.FemaleRestroom),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Masculino Banho',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.MaleBath),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Banheiro Masculino Sanitário',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.MaleRestroom),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Enfermagem',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.Nursing),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Guarda Volume',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.Lockers),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Lanche',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.Snack),
            rules: {
              required: true,
            },
            type: FieldType.number,
          },
          {
            label: 'Lavanderia',
            property: AttendancesService.AttendanceEnumToString(AttendanceType.Laundry),
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
    return whichAttendance.toString();
  };

  static createAttendanceObjectToSave = (
    date: Date,
    value: string,
    quantity: string,
  ): ServiceAttendanceOnDatabase => {
    return {
      service: parseInt(value,10),
      Date: date,
      Attendances: parseInt(quantity, 10),
    };
  };

  static saveAttendancesByDay = async (formData: {
    [key: string]: unknown;
  }): Promise<any[]> => {
    const body = { ...formData };
    console.log('body', body)

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    let response = [];
    Object.keys(body).forEach(async (key) => {
      console.log('key', key);
      if (key !== AttendancesService.AttendanceEnumToString(AttendanceType.Date)) {
        const objBody = AttendancesService.createAttendanceObjectToSave(
          new Date(body[AttendancesService.AttendanceEnumToString(AttendanceType.Date)]),
          key,
          body[key],
        );

        const { status, data } = await Api.post<ServiceAttendanceOnDatabase>(
          'service-attendances',
          objBody,
        );
        response.push(data);

        if (status !== 200) throw new Error();
      }
    });

    return response;
  };
}

export default AttendancesService;
