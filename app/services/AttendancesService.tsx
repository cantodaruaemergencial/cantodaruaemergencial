import { isMoment, Moment } from 'moment';
import { Api } from '#/packages/api/strapi';
import { FieldType, FormSection } from '#/types/Forms';
import { BasePerson } from '#/types/People';
import { PastoralDeRuaServiceAttendance } from '#/types/PastoralServiceAttendance';
import { UserProfile } from '#/packages/entities/types';

class AttendancesService {
  static getAttendancesForm = (referencePerson?: BasePerson) => {
    const sections: FormSection[] = [
      {
        label: `Atendimento - ${referencePerson?.name ?? ''}`,
        fields: [
          {
            label: 'Data de referência',
            property: 'service_attendance_date',
            value: null,
            type: FieldType.date,
            dateConfig: { disableFuture: true },
            rules: {
              required: true,
            },
          },
          {
            label: 'Precisa de conversa/escuta?',
            property: 'needs_conversation',
            type: FieldType.boolean,
          },
          {
            label: 'Precisa de telefonema? Descreva',
            property: 'describe_needs_call',
            rules: {
              required: true,
            },
            inputConfig: {
              maxLength: 150,
            },
            type: FieldType.input,
          },
          {
            label: 'Demanda sobre saúde? Descreva',
            property: 'describe_needs_health',
            rules: {
              required: true,
            },

            inputConfig: {
              maxLength: 150,
            },
            type: FieldType.input,
          },
          {
            label: 'Demanda sobre alimentação?',
            property: 'describe_needs_food',
            type: FieldType.boolean,
          },
          {
            label: 'Demanda sobre trabalho? Descreva',
            property: 'describe_needs_work',
            rules: {
              required: true,
            },
            inputConfig: {
              maxLength: 150,
            },
            type: FieldType.input,
          },
          {
            label: 'Demanda sobre moradia?',
            property: 'needs_house',
            type: FieldType.boolean,
          },
          {
            label: 'Demanda sobre república?',
            property: 'needs_temporary_home',
            type: FieldType.boolean,
          },
          {
            label: 'Demanda sobre documentos?',
            property: 'needs_documents',
            type: FieldType.boolean,
          },
          {
            label: 'Demanda sobre abrigo/albergue?',
            property: 'needs_shelter',
            type: FieldType.boolean,
          },
          {
            label: 'Demanda sobre cuidados de higiene?',
            property: 'needs_hygiene_care',
            type: FieldType.boolean,
          },
          {
            label: 'Outras demandas? Descreva',
            property: 'describe_needs_others',
            rules: {
              required: true,
            },
            inputConfig: {
              maxLength: 150,
            },
            type: FieldType.input,
          },
          {
            label: 'Observações',
            property: 'comment',
            rules: {
              required: true,
            },
            inputConfig: {
              maxLength: 150,
            },
            type: FieldType.input,
          },
        ],
      },
    ];

    return { sections };
  };

  static saveAttendancesByDay = async (
    formData: {
      [key: string]: unknown;
    },
    loggedUser: UserProfile | null,
    referencePerson?: BasePerson,
  ): Promise<{ data: PastoralDeRuaServiceAttendance }> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD HH:mm:ss');
      }
    });

    const requestBody = {
      ...body,
      person: referencePerson?.id,
      user: loggedUser?.id,
    };

    const { status, data } = await Api.post<PastoralDeRuaServiceAttendance>(
      'pastoral-de-rua-service-attendances',
      requestBody,
    );

    if (status !== 200) throw new Error();

    return { data };
  };
}

export default AttendancesService;
