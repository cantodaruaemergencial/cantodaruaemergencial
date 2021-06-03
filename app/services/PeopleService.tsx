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
            property: 'CardNumber',
            value: person?.CardNumber,
            label: 'Cartão',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
            disabled: person !== null,
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
            label: 'Nome da Mãe',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'BirthDate',
            value: person ? moment(person.BirthDate) : null,
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
            label: 'Cor/Raça',
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
            label: 'Número de Filhos',
            type: FieldType.number,
            rules: {
              required: true,
            },
          },
          {
            property: 'school_training',
            value: person?.school_training?.id,
            label: 'Formação Escolar',
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
            label: 'Ocupação',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Profession',
            value: person?.Profession,
            label: 'Profissão',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
        ],
      },
      {
        label: 'Documentação',
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
            label: 'Número do RG',
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
            label: 'Número do CPF',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasBirthCertificate',
            value: person?.HasBirthCertificate,
            label: 'Possui Certidão de Nascimento?',
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
        label: 'Informações Adicionais',
        fields: [
          {
            property: 'HasEmergencyAid',
            value: person?.HasEmergencyAid,
            label: 'Recebe Auxílio Emergencial?',
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
            label: 'Possui Cadastro Único?',
            type: FieldType.boolean,
          },
          {
            property: 'Benefits',
            value: (person?.Benefits || []).map((b) => b.id),
            label: 'Recebe algum benefício?',
            type: FieldType.selectMultiple,
            options: benefits.map(
              (b): FormFieldOption => ({
                value: b.id,
                label: b.benefit,
              }),
            ),
          },
          {
            property: 'ExternalServices',
            value: (person?.ExternalServices || []).map((es) => es.id),
            label: 'Utiliza algum dos serviços?',
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
            label: 'Tempo em situação de rua',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'ReferenceAddress',
            value: person?.ReferenceAddress,
            label: 'Local de referência',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Contatos e Observações',
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
            label: 'Endereço de referência',
            description: 'Endereço de familiar ou amigo',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
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
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
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
  ): Promise<unknown> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    return personId !== null
      ? Api.put(`people/${personId}`, body)
      : Api.post('people', body);
  };
}

export default PeopleService;
