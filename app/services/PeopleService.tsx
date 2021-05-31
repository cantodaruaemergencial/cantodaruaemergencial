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

  static getPersonForm = async (): Promise<Form> => {
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
            label: 'Cartão',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Name',
            label: 'Nome',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'SocialName',
            label: 'Nome Social',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'MotherName',
            label: 'Nome da Mãe',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'BirthDate',
            label: 'Data de Nascimento',
            type: FieldType.date,
            dateConfig: { disableFuture: true },
            rules: {
              required: true,
            },
          },
          {
            property: 'BirthPlace',
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
            label: 'Número de Filhos',
            type: FieldType.number,
            rules: {
              required: true,
            },
          },
          {
            property: 'school_training',
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
            label: 'Ocupação',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Profession',
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
            label: 'Possui RG?',
            type: FieldType.boolean,
          },
          {
            property: 'GeneralRegister',
            label: 'Número do RG',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasCpf',
            label: 'Possui CPF?',
            type: FieldType.boolean,
          },
          {
            property: 'Cpf',
            label: 'Número do CPF',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasBirthCertificate',
            label: 'Possui Certidão de Nascimento?',
            type: FieldType.boolean,
          },
          {
            property: 'HasCtps',
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
            label: 'Recebe Auxílio Emergencial?',
            type: FieldType.boolean,
          },
          {
            property: 'HasPbhBasket',
            label: 'Recebe Cesta PBH?',
            type: FieldType.boolean,
          },
          {
            property: 'HasUniqueRegister',
            label: 'Possui Cadastro Único?',
            type: FieldType.boolean,
          },
          {
            property: 'Benefits',
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
            label: 'Possui moradia?',
            type: FieldType.boolean,
          },
          {
            property: 'HomelessTime',
            label: 'Tempo em situação de rua',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'ReferenceAddress',
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
            label: 'Telefone de Contato',
            type: FieldType.number,
          },
          {
            property: 'ReferenceLocation',
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
            label: 'Demandas',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'Observation',
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
    ];

    return { sections };
  };

  static saveNewPerson = async (formData: {
    [key: string]: unknown;
  }): Promise<unknown> => {
    const body = { ...formData };

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    return Api.post('people', body);
  };
}

export default PeopleService;
