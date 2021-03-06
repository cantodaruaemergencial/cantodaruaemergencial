import moment, { isMoment, Moment } from 'moment';

import { Api } from '#/packages/api/strapi';
import { FieldType, Form, FormFieldOption, FormSection } from '#/types/Forms';
import {
  Benefit,
  ExternalService,
  Gender,
  MaritalStatus,
  BasePerson,
  SchoolTraining,
  SkinColor,
  Person,
} from '#/types/People';

class PeopleService {
  static get = (
    startIndex: number,
    limit: number,
    filter?: { nameOrCardNumber?: string },
  ) => {
    const query = {
      start: startIndex,
      limit,
      filter: filter?.nameOrCardNumber,
    };

    return Api.get<BasePerson[]>('people2', query)
      .then((res) => res.data)
      .then((data) =>
        data?.map((p) => {
          p.LastEntranceDate = p.LastEntranceDate
            ? moment(p.LastEntranceDate)
            : null;

          p.EnteredToday =
            !!p.LastEntranceDate && moment().isSame(p.LastEntranceDate, 'day');

          return p;
        }),
      );
  };

  static getGenders = () =>
    Api.publicGet<Gender[]>('genders').then((res) => res.data);

  static getSkinColors = () =>
    Api.publicGet<SkinColor[]>('skin-colors').then((res) => res.data);

  static getMaritalStatuses = () =>
    Api.publicGet<MaritalStatus[]>('marital-statuses').then((res) => res.data);

  static getSchoolTrainings = () =>
    Api.publicGet<SchoolTraining[]>('school-trainings').then((res) => res.data);

  static getExternalServices = () =>
    Api.publicGet<ExternalService[]>('external-services').then(
      (res) => res.data,
    );

  static getBenefits = () =>
    Api.publicGet<Benefit[]>('benefits').then((res) => res.data);

  static getPerson = (personId: number) =>
    Api.get<Person>(`people/${personId}`).then((res) => res.data);

  static getPersonForm = async (personId: number | null): Promise<Form> => {
    let person;

    if (personId) {
      person = await PeopleService.getPerson(personId);
    }

    const [
      genders,
      skinColors,
      maritalStatuses,
      schoolTrainings,
      externalServices,
      benefits,
    ] = await Promise.all([
      PeopleService.getGenders(),
      PeopleService.getSkinColors(),
      PeopleService.getMaritalStatuses(),
      PeopleService.getSchoolTrainings(),
      PeopleService.getExternalServices(),
      PeopleService.getBenefits(),
    ]);

    const sections: FormSection[] = [
      {
        label: 'Dados Pessoais',
        fields: [
          {
            property: 'Preferential',
            value: person?.Preferential,
            label: 'Preferencial',
            type: FieldType.boolean,
          },
          {
            property: 'CardNumber',
            value: person?.CardNumber,
            label: 'Cart??o',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: false,
            },
            disabled: true,
          },
          {
            property: 'Name',
            value: person?.Name,
            label: 'Nome',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'SocialName',
            value: person?.SocialName,
            label: 'Nome Social',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'MotherName',
            value: person?.MotherName,
            label: 'Nome da M??e',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'BirthDate',
            value: person?.BirthDate ? moment(person.BirthDate) : null,
            label: 'Data de Nascimento',
            type: FieldType.date,
            dateConfig: { disableFuture: true },
            rules: {
              required: true,
            },
          },
          {
            property: 'BirthPlace',
            value: person?.BirthPlace,
            label: 'Naturalidade',
            description: 'Exemplo: Belo Horizonte - MG',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'gender',
            value: person?.gender?.id,
            label: 'Sexo',
            type: FieldType.select,
            options: genders.map(
              (g): FormFieldOption => ({
                value: g.id,
                label: g.Gender,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'skin_color',
            value: person?.skin_color?.id,
            label: 'Cor/Ra??a',
            type: FieldType.select,
            options: skinColors.map(
              (g): FormFieldOption => ({
                value: g.id,
                label: g.SkinColor,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'marital_status',
            label: 'Estado Civil',
            value: person?.marital_status?.id,
            type: FieldType.select,
            options: maritalStatuses.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.MaritalStatus,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'Childrens',
            value: person?.Childrens,
            label: 'N??mero de Filhos',
            type: FieldType.number,
            rules: {
              required: true,
            },
          },
          {
            property: 'school_training',
            value: person?.school_training?.id,
            label: 'Forma????o Escolar',
            type: FieldType.select,
            options: schoolTrainings.map(
              (st): FormFieldOption => ({
                value: st.id,
                label: st.SchoolTraining,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'Occupation',
            value: person?.Occupation,
            label: 'Ocupa????o',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Profession',
            value: person?.Profession,
            label: 'Profiss??o',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
        ],
      },
      {
        label: 'Documenta????o',
        fields: [
          {
            property: 'HasGeneralRegister',
            value: person?.HasGeneralRegister,
            label: 'Possui RG?',
            type: FieldType.boolean,
          },
          {
            property: 'GeneralRegister',
            value: person?.GeneralRegister,
            label: 'N??mero do RG',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasCpf',
            value: person?.HasCpf,
            label: 'Possui CPF?',
            type: FieldType.boolean,
          },
          {
            property: 'Cpf',
            value: person?.Cpf,
            label: 'N??mero do CPF',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasBirthCertificate',
            value: person?.HasBirthCertificate,
            label: 'Possui Certid??o de Nascimento?',
            type: FieldType.boolean,
          },
          {
            property: 'HasCtps',
            value: person?.HasCtps,
            label: 'Possui CTPS?',
            type: FieldType.boolean,
          },
        ],
      },
      {
        label: 'Informa????es Adicionais',
        fields: [
          {
            property: 'HasEmergencyAid',
            value: person?.HasEmergencyAid,
            label: 'Recebe Aux??lio Emergencial?',
            type: FieldType.boolean,
          },
          {
            property: 'HasPbhBasket',
            value: person?.HasPbhBasket,
            label: 'Recebe Cesta PBH?',
            type: FieldType.boolean,
          },
          {
            property: 'HasUniqueRegister',
            value: person?.HasUniqueRegister,
            label: 'Possui Cadastro ??nico?',
            type: FieldType.boolean,
          },
          {
            property: 'benefits',
            value: (person?.benefits || []).map((b) => b.id),
            label: 'Recebe algum benef??cio?',
            type: FieldType.selectMultiple,
            options: benefits.map(
              (b): FormFieldOption => ({
                value: b.id,
                label: b.benefit,
              }),
            ),
          },
          {
            property: 'external_services',
            value: (person?.external_services || []).map((es) => es.id),
            label: 'Utiliza algum dos servi??os?',
            type: FieldType.selectMultiple,
            options: externalServices.map(
              (es): FormFieldOption => ({
                value: es.id,
                label: es.ExternalService,
              }),
            ),
          },
          {
            property: 'HasHabitation',
            value: person?.HasHabitation,
            label: 'Possui moradia?',
            type: FieldType.boolean,
          },
          {
            property: 'HomelessTime',
            value: person?.HomelessTime,
            label: 'Tempo em situa????o de rua',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'ReferenceAddress',
            value: person?.ReferenceAddress,
            label: 'Local de refer??ncia',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Contatos e Observa????es',
        fields: [
          {
            property: 'ContactPhone',
            value: person?.ContactPhone,
            label: 'Telefone de Contato',
            type: FieldType.number,
          },
          {
            property: 'ReferenceLocation',
            value: person?.ReferenceLocation,
            label: 'Endere??o de refer??ncia',
            description: 'Endere??o de familiar ou amigo',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: false,
            },
          },
          {
            property: 'Demands',
            value: person?.Demands,
            label: 'Demandas',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'Observation',
            value: person?.Observation,
            label: 'Observa????es',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Confer??ncia',
        fields: [
          {
            property: 'Checked',
            value: person?.Checked,
            label: 'Conferido',
            type: FieldType.boolean,
          },
          {
            property: 'CheckedBy',
            value: person?.CheckedBy,
            label: 'Conferido por',
            type: FieldType.input,
          },
          {
            property: 'CheckedAt',
            value: person?.CheckedAt,
            label: 'Conferido em',
            type: FieldType.date,
          },
        ],
      },
    ];

    return { sections };
  };

  static savePerson = async (
    formData: {
      [key: string]: unknown;
    },
    personId?: number | null,
  ): Promise<Person> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    const saveMethod =
      personId !== null
        ? Api.put<Person>(`people/${personId}`, body)
        : Api.post<Person>('people', body);

    const { status, data } = await saveMethod;

    if (status !== 200) throw new Error();

    return data;
  };
}

export default PeopleService;
