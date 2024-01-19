import moment, { isMoment, Moment } from 'moment';

import { Api } from '#/packages/api/strapi';
import {
  FieldType,
  FormAndPersonData,
  FormFieldOption,
  FormSection,
} from '#/types/Forms';
import {
  BasePerson,
  Person,
  GeneralOption,
  PersonCompleteData,
  Education,
  Culture,
  HealthSituation,
  JudicialSituation,
  Infrastructure,
  Safety,
  StreetPath,
  WorkAndIncome,
  FamilyReferences,
  SocialAssistanceNetwork,
  PersonVacancyReservationBenefit,
} from '#/types/People';
import { UserProfile } from '#/packages/entities/types';
import { RulesMessages } from '#/utils/rules-messages';

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

    return Api.get<BasePerson[]>('people2', query).then((res) => res.data);
  };

  static getAssociations = () =>
    Api.publicGet<GeneralOption[]>('associations').then((res) => res.data);

  static getDrugsFrequency = () =>
    Api.publicGet<GeneralOption[]>('drugs-frequencies').then((res) => res.data);

  static getEducationDegreeOptions = () =>
    Api.publicGet<GeneralOption[]>('education-degree-options').then(
      (res) => res.data,
    );

  static getWorkTypes = () =>
    Api.publicGet<GeneralOption[]>('work-types').then((res) => res.data);

  static getPastWorkCategory = () =>
    Api.publicGet<GeneralOption[]>('past-work-categories').then(
      (res) => res.data,
    );

  static getPastWorkSector = () =>
    Api.publicGet<GeneralOption[]>('past-work-sectors').then((res) => res.data);

  static getGenders = () =>
    Api.publicGet<GeneralOption[]>('genders').then((res) => res.data);

  static getSelfDeclarations = () =>
    Api.publicGet<GeneralOption[]>('self-declarations').then((res) => res.data);

  static getSexualOrientation = () =>
    Api.publicGet<GeneralOption[]>('sexual-orientations').then(
      (res) => res.data,
    );

  static getMaritalStatuses = () =>
    Api.publicGet<GeneralOption[]>('marital-statuses').then((res) => res.data);

  static getPerson = (personId: number) =>
    Api.get<Person>(`people/${personId}`).then((res) => res.data);

  static getPersonCompleteData = (personId: number) =>
    Api.get<PersonCompleteData>(`general-data/person/${personId}`).then(
      (res) => res.data,
    );

  static getPersonForm = async (
    personId: number | null,
    loggedUser: UserProfile | null,
  ): Promise<FormAndPersonData> => {
    let person;
    let personCompleteData;

    if (personId) {
      person = await PeopleService.getPerson(personId);
      personCompleteData = await PeopleService.getPersonCompleteData(personId);
    }

    const [
      genders,
      selfDeclaration,
      maritalStatuses,
      sexualOrientations,
      educationDegreeOptions,
      workTypes,
      pastWorkCategories,
      pastWorkSectors,
      drugsFrequency,
    ] = await Promise.all([
      PeopleService.getGenders(),
      PeopleService.getSelfDeclarations(),
      PeopleService.getMaritalStatuses(),
      PeopleService.getSexualOrientation(),
      PeopleService.getEducationDegreeOptions(),
      PeopleService.getWorkTypes(),
      PeopleService.getPastWorkCategory(),
      PeopleService.getPastWorkSector(),
      PeopleService.getDrugsFrequency(),
    ]);

    const sections: FormSection[] = [
      {
        label: 'Dados Pessoais',
        fields: [
          {
            property: 'card_number',
            value: person?.card_number,
            label: 'Cartão',
            type: FieldType.input,
            rules: {
              required: false,
            },
            disabled: true,
          },
          {
            property: 'name',
            value: person?.name,
            label: 'Nome',
            type: FieldType.input,
            inputConfig: { maxLength: 100 },
            rules: {
              required: true,
            },
          },
          {
            property: 'social_name',
            value: person?.social_name ?? '',
            label: 'Nome Social',
            type: FieldType.input,
            inputConfig: { maxLength: 100 },
            rules: {
              required: true,
            },
          },
          {
            property: 'mother_name',
            value: person?.mother_name,
            label: 'Nome da Mãe',
            type: FieldType.input,
            inputConfig: { maxLength: 100 },
          },
          {
            property: 'father_name',
            value: person?.father_name,
            label: 'Nome do Pai',
            type: FieldType.input,
            inputConfig: { maxLength: 100 },
          },
          {
            property: 'birth_date',
            value: person?.birth_date ? moment(person.birth_date) : null,
            label: 'Data de Nascimento',
            type: FieldType.date,
            dateConfig: { disableFuture: true },
            rules: {
              required: true,
            },
          },
          {
            property: 'birth_state',
            value: person?.birth_state,
            label: 'Naturalidade',
            description: 'Exemplo: Belo Horizonte - MG',
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: true,
            },
          },
          {
            property: 'nationality',
            value: person?.nationality,
            label: 'Nacionalidade',
            description: 'Exemplo: Brasileiro',
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: true,
            },
          },
          {
            property: 'occupation',
            value: person?.occupation,
            label: 'Ocupação',
            description: 'Profissão',
            type: FieldType.input,
            inputConfig: { maxLength: 100 },
            rules: {
              required: true,
            },
          },
          {
            property: 'email',
            value: person?.email,
            label: 'E-mail',
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: false,
            },
          },
          {
            property: 'phone_number',
            label: 'Telefone de Contato',
            value: person?.phone_number,
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: false,
            },
          },
          {
            property: 'birth_document_number',
            label: 'Número Certidão de Nascimento',
            value: person?.birth_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: false,
            },
          },
          {
            property: 'wedding_document_number',
            label: 'Número Certidão de Casamento',
            value: person?.wedding_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: false,
            },
          },
          {
            property: 'rg_document_number',
            label: 'Número Documento RG',
            value: person?.rg_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 20 },
            rules: {
              required: false,
            },
          },
          {
            property: 'cpf_document_number',
            label: 'Número Documento CPF',
            value: person?.cpf_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 11, minLength: 11 },
            description: 'Mínimo de 11 dígitos',
            rules: {
              required: true,
              validate: {
                minLength: (value: string) => {
                  if (value?.length !== 11) return RulesMessages(11).minLength;
                  return true;
                },
              },
            },
          },
          {
            property: 'reservist_document_number',
            label: 'Número do Certificado de Reservista',
            value: person?.reservist_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 20 },
            rules: {
              required: false,
            },
          },
          {
            property: 'voter_registration_document_number',
            label: 'Número do Título de Eleitor',
            value: person?.voter_registration_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 20 },
            rules: {
              required: false,
            },
          },
          {
            property: 'cnh_document_number',
            label: 'Número Documento CNH',
            value: person?.cnh_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 9 },
            rules: {
              required: false,
            },
          },
          {
            property: 'ctps_document_number',
            label: 'Número Documento CTPS',
            value: person?.ctps_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 8 },
            rules: {
              required: false,
            },
          },
          {
            property: 'nis_document_number',
            label: 'Número Documento NIS',
            value: person?.nis_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 20 },
            rules: {
              required: false,
            },
          },
          {
            property: 'caduni_document_number',
            label: 'Número Documento CADUNI',
            value: person?.caduni_document_number,
            type: FieldType.input,
            inputConfig: { maxLength: 20 },
            rules: {
              required: false,
            },
          },
          {
            property: 'has_govbr_registration',
            label: 'Possui registro no Gov BR?',
            value: person?.has_govbr_registration,
            type: FieldType.boolean,
            rules: {
              required: false,
            },
          },
          {
            property: 'gender',
            value: person?.gender?.id,
            label: 'Identidade de Gênero',
            type: FieldType.select,
            options: genders.map(
              (g): FormFieldOption => ({
                value: g.id,
                label: g.name,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'self_declaration',
            value: person?.self_declaration?.id,
            label: 'Autodeclaração de Cor/Raça',
            type: FieldType.select,
            options: selfDeclaration.map(
              (g): FormFieldOption => ({
                value: g.id,
                label: g.name,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'marital_status',
            label: 'Situação Civil',
            value: person?.marital_status?.id,
            type: FieldType.select,
            options: maritalStatuses.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'sexual_orientation',
            label: 'Orientação Sexual',
            value: person?.sexual_orientation?.id,
            type: FieldType.select,
            options: sexualOrientations.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'child_quantity',
            value: person?.child_quantity,
            label: 'Possui filhos? Se sim, quantos?',
            type: FieldType.number,
            rules: {
              required: true,
            },
          },
          {
            property: 'child_care_person',
            value: person?.child_care_person,
            label: 'Quem cuida dos filhos?',
            type: FieldType.input,
            inputConfig: { maxLength: 50 },
            rules: {
              required: false,
            },
          },
          {
            property: 'comment_person',
            value: person?.comment_person,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
            rules: {
              required: false,
            },
          },
        ],
      },
      {
        label: 'Educação',
        fields: [
          {
            property: 'is_currently_studying',
            value: personCompleteData?.education.is_currently_studying,
            label: 'Está atualmente estudando?',
            type: FieldType.boolean,
          },
          {
            property: 'study_degree',
            label: 'Escolaridade',
            value: personCompleteData?.education.study_degree?.id,
            type: FieldType.select,
            options: educationDegreeOptions.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
            rules: {
              required: true,
            },
          },
          {
            property: 'is_interested_returning_study',
            value: personCompleteData?.education.is_currently_studying,
            label: 'Deseja voltar a estudar?',
            type: FieldType.boolean,
          },
          {
            property: 'has_extra_course',
            value: personCompleteData?.education.has_extra_course,
            label: 'Possui algum curso além da escola regular?',
            type: FieldType.boolean,
          },
          {
            property: 'is_interested_doing_some_course',
            value:
              personCompleteData?.education.is_interested_doing_some_course,
            label: 'Está interessada(o) em fazer algum curso?',
            type: FieldType.boolean,
          },
          {
            property: 'desired_extra_course',
            value: personCompleteData?.education.desired_extra_course,
            label: 'Descreva os cursos de interesse',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Cultura',
        fields: [
          {
            property: 'exercises_practiced',
            value: personCompleteData?.culture.exercises_practiced,
            label: 'Pratica exercício físico? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
          {
            property: 'exercises_quantity_by_week',
            value: personCompleteData?.culture.exercises_quantity_by_week,
            label: 'Quantidade de vezes por semana que pratica exercício',
            type: FieldType.number,
          },
          {
            property: 'know_some_cultural_place',
            value: personCompleteData?.culture.know_some_cultural_place,
            label: 'Conhece algum espaço cultural?',
            description:
              'Biblioteca, teatro, cinemas, centros culturais, parques e praças públicas, estádio, etc.',
            type: FieldType.boolean,
          },
          {
            property: 'usually_go_to_some_culture_place',
            value: personCompleteData?.culture.usually_go_to_some_culture_place,
            label: 'Frequenta algum espaço cultural?',
            description:
              'Biblioteca, teatro, cinemas, centros culturais, parques e praças públicas, estádio, etc.',
            type: FieldType.boolean,
          },
          {
            property: 'went_somewhere_place_last_twelve_months',
            value:
              personCompleteData?.culture
                .went_somewhere_place_last_twelve_months,
            label: 'Foi em algum espaço cultural nos últimos 12 meses?',
            description: 'Algum show ou espaço cultural da cidade',
            type: FieldType.boolean,
          },
          {
            property: 'has_reading_habit',
            value: personCompleteData?.culture.has_reading_habit,
            label: 'Tem hábito de ler?',
            type: FieldType.boolean,
          },
          {
            property: 'has_listening_music_habit',
            value: personCompleteData?.culture.has_listening_music_habit,
            label: 'Tem hábito de ouvir música?',
            type: FieldType.boolean,
          },
          {
            property: 'has_drawing_habit',
            value: personCompleteData?.culture.has_drawing_habit,
            label: 'Tem hábito de desenhar?',
            type: FieldType.boolean,
          },
          {
            property: 'other_habit',
            value: personCompleteData?.culture.other_habit,
            label: 'Tem outros hábitos? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Situação Judicial',
        fields: [
          {
            property: 'has_already_been_through_the_socioeducational_system',
            value:
              personCompleteData?.judicialSituation
                .has_already_been_through_the_socioeducational_system,
            label: 'Já passou pelo sistema socioeducativo?',
            type: FieldType.boolean,
          },
          {
            property: 'has_already_been_through_the_prision_system',
            value:
              personCompleteData?.judicialSituation
                .has_already_been_through_the_prision_system,
            label: 'Já passou pelo sistema prisional?',
            type: FieldType.boolean,
          },
          {
            property: 'has_an_active_lawsuit',
            value: personCompleteData?.judicialSituation.has_an_active_lawsuit,
            label: 'Possui algum processo judicial ativo?',
            type: FieldType.boolean,
          },
          {
            property: 'has_outstanding_writ_of_execution',
            value:
              personCompleteData?.judicialSituation
                .has_outstanding_writ_of_execution,
            label: 'Possui mandado de execução em aberto?',
            type: FieldType.boolean,
          },
          {
            property: 'wear_anklet',
            value: personCompleteData?.judicialSituation.wear_anklet,
            label: 'Usa tornozeleira eletrônica?',
            type: FieldType.boolean,
          },
          {
            property: 'is_accompanied_by_a_defender',
            value:
              personCompleteData?.judicialSituation
                .is_accompanied_by_a_defender,
            label: 'Está sendo acompanhado por defensor',
            type: FieldType.boolean,
          },
          {
            property: 'is_this_follow_up_enough',
            value:
              personCompleteData?.judicialSituation.is_this_follow_up_enough,
            label: 'Este acompanhamento está sendo suficiente?',
            type: FieldType.boolean,
          },
          {
            property: 'comment_judicial_situation',
            value:
              personCompleteData?.judicialSituation.comment_judicial_situation,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Infraestrutura',
        fields: [
          {
            property: 'has_access_to_clean_water',
            value: personCompleteData?.infrastructure.has_access_to_clean_water,
            label: 'Tem acesso diário a água potável?',
            type: FieldType.boolean,
          },
          {
            property: 'has_access_to_adequate_toilets',
            value:
              personCompleteData?.infrastructure.has_access_to_adequate_toilets,
            label: 'Tem acesso diário a sanitário adequado?',
            type: FieldType.boolean,
          },
          {
            property: 'has_access_to_a_bed',
            value: personCompleteData?.infrastructure.has_access_to_a_bed,
            label: 'Tem acesso diário a uma cama?',
            type: FieldType.boolean,
          },
          {
            property: 'has_access_to_safety_spot',
            value: personCompleteData?.infrastructure.has_access_to_safety_spot,
            label: 'Tem acesso diário a um lugar seguro?',
            description:
              'Cama para pernoitar e lugar fechado para se abrigar da chuva e sol',
            type: FieldType.boolean,
          },
          {
            property: 'place_of_stay_has_adequate_hygiene',
            value:
              personCompleteData?.infrastructure
                .place_of_stay_has_adequate_hygiene,
            label: 'O lugar de estadia tem higiene adequada?',
            type: FieldType.boolean,
          },
          {
            property: 'place_of_stay_has_adequate_structure',
            value:
              personCompleteData?.infrastructure
                .place_of_stay_has_adequate_structure,
            label: 'O lugar de estadia tem estrutura adequada?',
            description:
              'Materiais utilizados, tamanho, disposição de cômodos, iluminação e ventilação',
            type: FieldType.boolean,
          },
          {
            property: 'place_of_stay_has_proximity_to_basic_services',
            value:
              personCompleteData?.infrastructure
                .place_of_stay_has_proximity_to_basic_services,
            label: 'O lugar de estadia é próximo de serviços básicos?',
            description: 'Mercado, escola, hospitais, transporte público, etc',
            type: FieldType.boolean,
          },
          {
            property: 'place_of_stay_has_adequate_sound_condition',
            value:
              personCompleteData?.infrastructure
                .place_of_stay_has_adequate_sound_condition,
            label: 'O lugar de estadia tem condição sonora adequada?',
            description: 'Sem barulho ou ruídos que perturbem o descanso',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_furniture',
            value: personCompleteData?.infrastructure.has_any_furniture,
            label: 'Você possui alguma mobília?',
            description:
              'Algo que pretende levar para a moradia, caso seja contemplado',
            type: FieldType.boolean,
          },
          {
            property: 'comment_infrastructure',
            value: personCompleteData?.infrastructure.comment_infrastructure,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Segurança',
        fields: [
          {
            property:
              'quantity_victim_of_crimes_against_property_last_three_months',
            value:
              personCompleteData?.safeties
                .quantity_victim_of_crimes_against_property_last_three_months,
            label:
              'Foi vítima de crimes contra a propridade (Últimos 3 meses)? Se sim, quantas vezes?',
            type: FieldType.number,
          },
          {
            property:
              'quantity_victim_of_crimes_against_person_last_three_months',
            value:
              personCompleteData?.safeties
                .quantity_victim_of_crimes_against_person_last_three_months,
            label:
              'Foi vítima de crimes contra a pessoa (Últimos 3 meses)? Se sim, quantas vezes?',
            type: FieldType.number,
          },
          {
            property:
              'quantity_victim_of_institutional_violence_last_three_months',
            value:
              personCompleteData?.safeties
                .quantity_victim_of_institutional_violence_last_three_months,
            label:
              'Foi vítima de crimes de violência institucional (Últimos 3 meses)? Se sim, quantas vezes?',
            type: FieldType.number,
          },
          {
            property: 'comment_safety',
            value: personCompleteData?.safeties.comment_safety,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Trajetória de Rua',
        fields: [
          {
            property: 'is_currently_homeless',
            value: personCompleteData?.streetPaths.is_currently_homeless,
            label: 'Atualmente está em situação de rua?',
            type: FieldType.boolean,
          },
          {
            property: 'time_homeless',
            value: personCompleteData?.streetPaths.time_homeless,
            label: 'Há quanto tempo está em situação de rua?',
            type: FieldType.number,
          },
          {
            property: 'homeless_reason',
            value: personCompleteData?.streetPaths.homeless_reason,
            label: 'Motivo de estar em situação de rua',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'had_any_family_ties_interrupted_quantity',
            value:
              personCompleteData?.streetPaths
                .had_any_family_ties_interrupted_quantity,
            label:
              'Teve algum vínculo familiar interrompido? Se sim, há quanto tempo? (Em anos)',
            type: FieldType.number,
          },
          {
            property: 'already_been_in_shelter_quantity_months',
            value:
              personCompleteData?.streetPaths
                .already_been_in_shelter_quantity_months,
            label: 'Já esteve em um abrigo? Se sim, por quantos meses?',
            type: FieldType.number,
          },
          {
            property: 'already_been_in_hostel_quantity_months',
            value:
              personCompleteData?.streetPaths
                .already_been_in_hostel_quantity_months,
            label:
              'Já esteve em uma casa de passagem? Se sim, por quantos meses?',
            type: FieldType.number,
          },
          {
            property: 'time_lived_in_bh_months',
            value: personCompleteData?.streetPaths.time_lived_in_bh_months,
            label:
              'Há quanto tempo mora em Belo Horizonte? (Quantidade em meses)',
            type: FieldType.number,
          },
          {
            property: 'lived_on_streets_in_another_city',
            value:
              personCompleteData?.streetPaths.lived_on_streets_in_another_city,
            label:
              'Já viveu em situação de rua em outra cidade? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
          {
            property: 'any_family_member_have_been_homeless',
            value:
              personCompleteData?.streetPaths
                .any_family_member_have_been_homeless,
            label:
              'Algum membro da família está ou esteve em situação de rua? Se sim, quem?',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
          {
            property: 'reason_past_street_path_unemployment',
            value:
              personCompleteData?.streetPaths
                .reason_past_street_path_unemployment,
            label: 'O motivo de estar em situação de rua é desemprego?',
            type: FieldType.boolean,
          },
          {
            property: 'reason_past_street_path_family_problems',
            value:
              personCompleteData?.streetPaths
                .reason_past_street_path_family_problems,
            label:
              'O motivo de estar em situação de rua é problemas familiares?',
            type: FieldType.boolean,
          },
          {
            property: 'reason_past_street_path_drugs',
            value:
              personCompleteData?.streetPaths.reason_past_street_path_drugs,
            label: 'O motivo de estar em situação de rua é drogas?',
            type: FieldType.boolean,
          },
          {
            property: 'reason_past_street_path_comment',
            value:
              personCompleteData?.streetPaths.reason_past_street_path_comment,
            label:
              'Há outros motivos por estar em situação de rua? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'time_past_street_path',
            value: personCompleteData?.streetPaths.time_past_street_path,
            label: 'Já morou na rua antes? Quanto tempo? Em meses',
            type: FieldType.number,
          },
          {
            property: 'comment_street_path',
            value: personCompleteData?.streetPaths.comment_street_path,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Trabalho e renda',
        fields: [
          {
            property: 'already_has_paid_work',
            value: personCompleteData?.workAndIncomes.already_has_paid_work,
            label: 'Já possuiu um trabalho remunerado?',
            type: FieldType.boolean,
          },
          {
            property: 'describe_past_paid_work',
            value: personCompleteData?.workAndIncomes.describe_past_paid_work,
            label: 'Descreva quais trabalhos já possuiu',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'work_type',
            label: 'Trabalha atualmente?',
            value: personCompleteData?.workAndIncomes?.work_type?.id,
            type: FieldType.select,
            options: workTypes.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'participate_in_any_income_generation_projects',
            value:
              personCompleteData?.workAndIncomes
                .participate_in_any_income_generation_projects,
            label: 'Participa de algum projeto de geração de renda?',
            type: FieldType.boolean,
          },
          {
            property: 'what_is_being_done_to_get_out_of_this_situation',
            value:
              personCompleteData?.workAndIncomes
                .what_is_being_done_to_get_out_of_this_situation,
            label: 'O que está sendo feito para sair dessa situação?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'retirement_benefit_value',
            value: personCompleteData?.workAndIncomes.retirement_benefit_value,
            label: 'Possui benefício de aposentadoria? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'continuing_provision_benefit_value',
            value:
              personCompleteData?.workAndIncomes
                .continuing_provision_benefit_value,
            label:
              'Possui benefício de prestação continuada? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'sick_pay_benefit_value',
            value: personCompleteData?.workAndIncomes.sick_pay_benefit_value,
            label: 'Possui auxílio doença? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'bolsa_familia_benefit_value',
            value:
              personCompleteData?.workAndIncomes.bolsa_familia_benefit_value,
            label: 'Possui benefício de Bolsa Família? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'brazil_financial_assistance_benefit_value',
            value:
              personCompleteData?.workAndIncomes
                .brazil_financial_assistance_benefit_value,
            label: 'Possui auxílio Brasil? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'other_benefit_value',
            value: personCompleteData?.workAndIncomes.other_benefit_value,
            label: 'Possui outro benefício? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'family_average_monthly_income_value',
            value:
              personCompleteData?.workAndIncomes
                .family_average_monthly_income_value,
            label: 'Renda média familiar mensal',
            type: FieldType.number,
          },
          {
            property: 'past_work_category',
            label: 'Em qual categoria já trabalhou?',
            value: personCompleteData?.workAndIncomes?.past_work_category?.id,
            type: FieldType.select,
            options: pastWorkCategories.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'past_work_sector',
            label: 'Em qual setor já trabalhou?',
            value: personCompleteData?.workAndIncomes?.past_work_sector?.id,
            type: FieldType.select,
            options: pastWorkSectors.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'comment_work_and_income',
            value: personCompleteData?.workAndIncomes.comment_work_and_income,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Referências Familiares',
        fields: [
          {
            property: 'description',
            value: personCompleteData?.familyReferences.description,
            label:
              'Quem são as pessoas do núcleo familiar? Descreva nome, parentesco e escolaridade',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'comment_family_references',
            value:
              personCompleteData?.familyReferences.comment_family_references,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Assistência Social',
        fields: [
          {
            property: 'is_attended_to_a_network_services',
            value:
              personCompleteData?.socialAssistanceNetwork
                .is_attended_to_a_network_services,
            label: 'É atendido por algum serviço da rede?',
            type: FieldType.boolean,
          },
          {
            property: 'has_crea_service',
            value: personCompleteData?.socialAssistanceNetwork.has_crea_service,
            label: 'Atendido por CREA?',
            type: FieldType.boolean,
          },
          {
            property: 'has_cras_service',
            value: personCompleteData?.socialAssistanceNetwork.has_cras_service,
            label: 'Atendido por CRAS?',
            type: FieldType.boolean,
          },
          {
            property: 'has_shelter_service',
            value:
              personCompleteData?.socialAssistanceNetwork.has_shelter_service,
            label: 'Atendido por Abrigo?',
            type: FieldType.boolean,
          },
          {
            property: 'has_council_of_rights_service',
            value:
              personCompleteData?.socialAssistanceNetwork
                .has_council_of_rights_service,
            label: 'Atendido por conselho de direito?',
            type: FieldType.boolean,
          },
          {
            property: 'has_health_service',
            value:
              personCompleteData?.socialAssistanceNetwork.has_health_service,
            label: 'Atendido por saúde?',
            type: FieldType.boolean,
          },
          {
            property: 'has_education_service',
            value:
              personCompleteData?.socialAssistanceNetwork.has_education_service,
            label: 'Atendido por educação?',
            type: FieldType.boolean,
          },
          {
            property: 'has_pastoral_povo_da_rua_service',
            value:
              personCompleteData?.socialAssistanceNetwork
                .has_pastoral_povo_da_rua_service,
            label: 'Atendido por Pastoral de Rua?',
            type: FieldType.boolean,
          },
          {
            property: 'comment_social_assistance_network',
            value:
              personCompleteData?.socialAssistanceNetwork
                .comment_social_assistance_network,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Benefício de reserva de vagas',
        fields: [
          {
            property: 'has_vacancy_reservation_benefits_racial_quota',
            label: 'Possui algum benefício de vaga relacionado a cota racial?',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .has_vacancy_reservation_benefits_racial_quota,
            type: FieldType.boolean,
          },
          {
            property: 'has_vacancy_reservation_benefits_egress_prision_system',
            label:
              'Possui algum benefício de vaga relacionado a egresso de sistema prisional?',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .has_vacancy_reservation_benefits_egress_prision_system,
            type: FieldType.boolean,
          },
          {
            property: 'has_vacancy_reservation_benefits_lgbt',
            label: 'Possui algum benefício de vaga relacionado a LGBT?',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .has_vacancy_reservation_benefits_lgbt,
            type: FieldType.boolean,
          },
          {
            property: 'has_vacancy_reservation_benefits_others',
            label:
              'Possui algum benefício de vaga relacionado a outros assuntos? Comente',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .has_vacancy_reservation_benefits_others,
            type: FieldType.boolean,
          },
          {
            property: 'has_vacancy_reservation_benefits_pcd',
            label: 'Possui algum benefício de vaga relacionado a PCD?',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .has_vacancy_reservation_benefits_pcd,
            type: FieldType.boolean,
          },
          {
            property: 'details_person_vacancy_reservation_benefit',
            value:
              personCompleteData?.personVacancyReservationBenefit
                .details_person_vacancy_reservation_benefit,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Saúde',
        fields: [
          {
            property: 'self_health_evaluation',
            value: personCompleteData?.healthSituation.self_health_evaluation,
            label: 'Autoavaliação da saúde',
            description: 'Boa, Moderada, Ruim ou Péssima',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'date_last_medical_appointment',
            value: personCompleteData?.healthSituation
              .date_last_medical_appointment
              ? moment(
                  personCompleteData?.healthSituation
                    .date_last_medical_appointment,
                )
              : null,
            label: 'Data da última avaliação médica',
            type: FieldType.date,
          },
          {
            property: 'date_last_medical_dentist',
            value: personCompleteData?.healthSituation.date_last_medical_dentist
              ? moment(
                  personCompleteData?.healthSituation.date_last_medical_dentist,
                )
              : null,
            label: 'Data da última avaliação com dentista',
            type: FieldType.date,
          },
          {
            property: 'use_medication_often',
            value: personCompleteData?.healthSituation.use_medication_often,
            label: 'Faz uso contínuo de medicação?',
            type: FieldType.boolean,
          },
          {
            property: 'medication_details',
            value: personCompleteData?.healthSituation.medication_details,
            label: 'Quais são as medicações contínuas?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'was_hospitalized_last_twelve_months',
            value:
              personCompleteData?.healthSituation
                .was_hospitalized_last_twelve_months,
            label: 'Foi internado nos últimos 12 meses?',
            type: FieldType.boolean,
          },
          {
            property: 'hospitalized_reason',
            value: personCompleteData?.healthSituation.hospitalized_reason,
            label: 'Motivo da internação',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'time_hospitalized_days',
            value: personCompleteData?.healthSituation.time_hospitalized_days,
            label: 'Tempo internado (em meses)',
            type: FieldType.number,
          },
          {
            property: 'did_any_surgery',
            value: personCompleteData?.healthSituation.did_any_surgery,
            label: 'Já fez alguma cirurgia? Se sim, qual?',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
          {
            property: 'has_vaccination_card',
            value: personCompleteData?.healthSituation.has_vaccination_card,
            label: 'Possui cartão de vacinação?',
            type: FieldType.boolean,
          },
          {
            property: 'is_updated_vaccination_covid19',
            value:
              personCompleteData?.healthSituation
                .is_updated_vaccination_covid19,
            label: 'Tomou a vacina contra COVID19?',
            type: FieldType.boolean,
          },
          {
            property: 'is_updated_vaccination_hepatite',
            value:
              personCompleteData?.healthSituation
                .is_updated_vaccination_hepatite,
            label: 'Tomou a vacina contra Hepatite?',
            type: FieldType.boolean,
          },
          {
            property: 'is_updated_vaccination_tetano',
            value:
              personCompleteData?.healthSituation.is_updated_vaccination_tetano,
            label: 'Tomou a vacina contra Tetano?',
            type: FieldType.boolean,
          },
          {
            property: 'is_updated_vaccination_influenza',
            value:
              personCompleteData?.healthSituation
                .is_updated_vaccination_influenza,
            label: 'Tomou a vacina contra Influenza?',
            type: FieldType.boolean,
          },
          {
            property: 'is_updated_vaccination_febre_amarela',
            value:
              personCompleteData?.healthSituation
                .is_updated_vaccination_febre_amarela,
            label: 'Tomou a vacina contra Febre Amarela?',
            type: FieldType.boolean,
          },
          {
            property: 'questions_regarding_physical_or_mental_health',
            value:
              personCompleteData?.healthSituation
                .questions_regarding_physical_or_mental_health,
            label:
              'Possui alguma questão (ou queixa) sobre sua saúde física ou mental?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'do_some_follow_up',
            value: personCompleteData?.healthSituation.do_some_follow_up,
            label: 'Faz algum acompanhamento? Se sim, qual?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'use_alcohol_or_other_drugs',
            value:
              personCompleteData?.healthSituation.use_alcohol_or_other_drugs,
            label: 'Usa alcool ou outras drogas? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'drugs_frequency',
            label: 'Frequência de uso da droga',
            value: personCompleteData?.healthSituation?.drugs_frequency?.id,
            type: FieldType.select,
            options: drugsFrequency.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'has_ever_been_admitted_to_therapeutic_community',
            value:
              personCompleteData?.healthSituation
                .has_ever_been_admitted_to_therapeutic_community,
            label:
              'Já foi internado em uma comunidade terapêutica? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
          {
            property: 'need_dental_care',
            value: personCompleteData?.healthSituation.need_dental_care,
            label: 'Necessita de tratamento dental?',
            type: FieldType.boolean,
          },
          {
            property: 'describe_dental_care',
            value: personCompleteData?.healthSituation.describe_dental_care,
            label: 'Descreva o tratamento dental necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'need_psychological_care',
            value: personCompleteData?.healthSituation.need_psychological_care,
            label: 'Necessita de tratamento psicológico?',
            type: FieldType.boolean,
          },
          {
            property: 'describe_psychological_care',
            value:
              personCompleteData?.healthSituation.describe_psychological_care,
            label: 'Descreva o tratamento psicológico necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'need_psychiatric_care',
            value: personCompleteData?.healthSituation.need_psychiatric_care,
            label: 'Necessita de tratamento psiquiátrico?',
            type: FieldType.boolean,
          },
          {
            property: 'describe_psychiatric_care',
            value:
              personCompleteData?.healthSituation.describe_psychiatric_care,
            label: 'Descreva o tratamento psiquiátrico necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'other_specific_care',
            value: personCompleteData?.healthSituation.other_specific_care,
            label: 'Descreva outro tratamento necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'has_any_disabilities',
            value: personCompleteData?.healthSituation.has_any_disabilities,
            label: 'Possui alguma deficiência? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'describe_need_special_equipment',
            value:
              personCompleteData?.healthSituation
                .describe_need_special_equipment,
            label: 'Precisa de algum equipamento especial? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'has_any_comorbidities_hipertensao',
            value:
              personCompleteData?.healthSituation
                .has_any_comorbidities_hipertensao,
            label: 'Possui hipertensão?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_diabetes',
            value:
              personCompleteData?.healthSituation
                .has_any_comorbidities_diabetes,
            label: 'Possui diabetes?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_cardiovascular_problem',
            value:
              personCompleteData?.healthSituation
                .has_any_comorbidities_cardiovascular_problem,
            label: 'Possui problema cardiovascular?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_depression',
            value:
              personCompleteData?.healthSituation
                .has_any_comorbidities_depression,
            label: 'Possui depressão?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_asma',
            value:
              personCompleteData?.healthSituation.has_any_comorbidities_asma,
            label: 'Possui asma?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_cancer',
            value:
              personCompleteData?.healthSituation.has_any_comorbidities_cancer,
            label: 'Possui câncer?',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_none',
            value:
              personCompleteData?.healthSituation.has_any_comorbidities_none,
            label: 'Não possui comorbidade',
            type: FieldType.boolean,
          },
          {
            property: 'has_any_comorbidities_other',
            value:
              personCompleteData?.healthSituation.has_any_comorbidities_other,
            label: 'Há alguma outra comorbidade? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'man_health_last_prostate_exam_date',
            value: personCompleteData?.healthSituation
              .man_health_last_prostate_exam_date
              ? moment(
                  personCompleteData?.healthSituation
                    .man_health_last_prostate_exam_date,
                )
              : null,
            label: 'Saúde do Homem - Data do último exame de próstata',
            type: FieldType.date,
          },
          {
            property: 'man_health_last_ist_exam_date',
            value: personCompleteData?.healthSituation
              .man_health_last_ist_exam_date
              ? moment(
                  personCompleteData?.healthSituation
                    .man_health_last_ist_exam_date,
                )
              : null,
            label: 'Saúde do Homem - Data do último teste rápido (IST)',
            type: FieldType.date,
          },
          {
            property: 'woman_health_last_preventive_exam_date',
            value: personCompleteData?.healthSituation
              .woman_health_last_preventive_exam_date
              ? moment(
                  personCompleteData?.healthSituation
                    .woman_health_last_preventive_exam_date,
                )
              : null,
            label: 'Saúde da Mulher - Data do último exame preventivo',
            type: FieldType.date,
          },
          {
            property: 'woman_health_last_mammography_exam_date',
            value: personCompleteData?.healthSituation
              .woman_health_last_mammography_exam_date
              ? moment(
                  personCompleteData?.healthSituation
                    .woman_health_last_mammography_exam_date,
                )
              : null,
            label: 'Saúde da Mulher - Data do último exame de mamografia',
            type: FieldType.date,
          },
          {
            property: 'woman_health_last_gynecological_consultation_exam_date',
            value: personCompleteData?.healthSituation
              .woman_health_last_gynecological_consultation_exam_date
              ? moment(
                  personCompleteData?.healthSituation
                    .woman_health_last_gynecological_consultation_exam_date,
                )
              : null,
            label: 'Saúde da Mulher - Data da última consulta ginecológica',
            type: FieldType.date,
          },
          {
            property: 'woman_health_suspected_pregnancy_week_quantity',
            value:
              personCompleteData?.healthSituation
                .woman_health_suspected_pregnancy_week_quantity,
            label:
              'Saúde da Mulher - Há suspeita de gravidez? Quantas semanas?',
            type: FieldType.number,
          },
          {
            property: 'woman_health_use_some_contraceptive_method',
            value:
              personCompleteData?.healthSituation
                .woman_health_use_some_contraceptive_method,
            label: 'Saúde da Mulher - Usa algum método contraceptivo?',
            type: FieldType.boolean,
          },
          {
            property: 'use_condom',
            value: personCompleteData?.healthSituation.use_condom,
            label: 'Saúde da pessoa - Usa preservativo frequentemente?',
            type: FieldType.boolean,
          },
          {
            property: 'comment_health_situation',
            value: personCompleteData?.healthSituation.comment_health_situation,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 150 },
          },
        ],
      },
      {
        label: 'Conferência',
        fields: [
          {
            property: 'CheckedBy',
            label: 'Conferido por',
            type: FieldType.input,
            value: loggedUser?.displayName,
            disabled: true,
          },
          {
            property: 'CheckedAt',
            value: moment(new Date()),
            label: 'Conferido em',
            type: FieldType.date,
            disabled: true,
          },
        ],
      },
    ];

    return { sections, personCompleteData };
  };

  static mountPersonData(
    fullBody: { [key: string]: any },
    userId: number | null | undefined,
  ): Partial<Person> {
    return {
      birth_date: fullBody.birth_date,
      birth_document_number: fullBody.birth_document_number,
      birth_state: fullBody.birth_state,
      caduni_document_number: fullBody.caduni_document_number,
      child_care_person: fullBody.child_care_person,
      child_quantity: Number(fullBody.child_quantity),
      cnh_document_number: fullBody.cnh_document_number,
      comment_person: fullBody.comment_person,
      cpf_document_number: fullBody.cpf_document_number,
      ctps_document_number: fullBody.ctps_document_number,
      email: fullBody.email,
      father_name: fullBody.father_name,
      gender: fullBody.gender,
      has_govbr_registration: fullBody.has_govbr_registration ?? false,
      marital_status: fullBody.marital_status,
      mother_name: fullBody.mother_name,
      name: fullBody.name,
      nationality: fullBody.nationality,
      nis_document_number: fullBody.nis_document_number,
      occupation: fullBody.occupation,
      phone_number: fullBody.phone_number,
      reservist_document_number: fullBody.reservist_document_number,
      rg_document_number: fullBody.rg_document_number,
      self_declaration: fullBody.self_declaration,
      sexual_orientation: fullBody.sexual_orientation,
      social_name: fullBody.social_name,
      voter_registration_document_number:
        fullBody.voter_registration_document_number,
      wedding_document_number: fullBody.wedding_document_number,
      user: userId,
    };
  }

  static mountEducationData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<Education> {
    return {
      is_currently_studying: fullBody.is_currently_studying ?? false,
      desired_extra_course: fullBody.desired_extra_course,
      has_extra_course: fullBody.has_extra_course ?? false,
      is_interested_doing_some_course:
        fullBody.is_interested_doing_some_course ?? false,
      is_interested_returning_study:
        fullBody.is_interested_returning_study ?? false,
      study_degree: fullBody.study_degree,
      person: personId,
      user: userId,
    };
  }

  static mountCultureData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<Culture> {
    return {
      exercises_practiced: fullBody.exercises_practiced,
      exercises_quantity_by_week: fullBody.exercises_quantity_by_week,
      has_drawing_habit: fullBody.has_drawing_habit ?? false,
      has_listening_music_habit: fullBody.has_listening_music_habit ?? false,
      has_reading_habit: fullBody.has_reading_habit ?? false,
      know_some_cultural_place: fullBody.know_some_cultural_place ?? false,
      other_habit: fullBody.other_habit,
      usually_go_to_some_culture_place:
        fullBody.usually_go_to_some_culture_place ?? false,
      went_somewhere_place_last_twelve_months:
        fullBody.went_somewhere_place_last_twelve_months ?? false,
      person: personId,
      user: userId,
    };
  }

  static mountHealthSituationData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<HealthSituation> {
    return {
      self_health_evaluation: fullBody.self_health_evaluation,
      date_last_medical_appointment: fullBody.date_last_medical_appointment,
      date_last_medical_dentist: fullBody.date_last_medical_dentist,
      use_medication_often: fullBody.use_medication_often ?? false,
      medication_details: fullBody.medication_details,
      was_hospitalized_last_twelve_months:
        fullBody.was_hospitalized_last_twelve_months ?? false,
      hospitalized_reason: fullBody.hospitalized_reason,
      time_hospitalized_days: fullBody.time_hospitalized_days,
      did_any_surgery: fullBody.did_any_surgery ?? false,
      has_vaccination_card: fullBody.has_vaccination_card ?? false,
      is_updated_vaccination_covid19:
        fullBody.is_updated_vaccination_covid19 ?? false,
      is_updated_vaccination_hepatite:
        fullBody.is_updated_vaccination_hepatite ?? false,
      is_updated_vaccination_tetano:
        fullBody.is_updated_vaccination_tetano ?? false,
      is_updated_vaccination_influenza:
        fullBody.is_updated_vaccination_influenza ?? false,
      is_updated_vaccination_febre_amarela:
        fullBody.is_updated_vaccination_febre_amarela ?? false,
      questions_regarding_physical_or_mental_health:
        fullBody.questions_regarding_physical_or_mental_health,
      do_some_follow_up: fullBody.do_some_follow_up,
      use_alcohol_or_other_drugs: fullBody.use_alcohol_or_other_drugs,
      drugs_frequency: fullBody.drugs_frequency,
      has_ever_been_admitted_to_therapeutic_community:
        fullBody.has_ever_been_admitted_to_therapeutic_community,
      need_dental_care: fullBody.need_dental_care ?? false,
      describe_dental_care: fullBody.describe_dental_care,
      need_psychological_care: fullBody.need_psychological_care ?? false,
      describe_psychological_care: fullBody.describe_psychological_care,
      need_psychiatric_care: fullBody.need_psychiatric_care ?? false,
      describe_psychiatric_care: fullBody.describe_psychiatric_care,
      other_specific_care: fullBody.other_specific_care,
      has_any_disabilities: fullBody.has_any_disabilities,
      describe_need_special_equipment: fullBody.describe_need_special_equipment,
      has_any_comorbidities_hipertensao:
        fullBody.has_any_comorbidities_hipertensao ?? false,
      has_any_comorbidities_diabetes:
        fullBody.has_any_comorbidities_diabetes ?? false,
      has_any_comorbidities_cardiovascular_problem:
        fullBody.has_any_comorbidities_cardiovascular_problem ?? false,
      has_any_comorbidities_depression:
        fullBody.has_any_comorbidities_depression ?? false,
      has_any_comorbidities_asma: fullBody.has_any_comorbidities_asma ?? false,
      has_any_comorbidities_cancer:
        fullBody.has_any_comorbidities_cancer ?? false,
      has_any_comorbidities_none: fullBody.has_any_comorbidities_none ?? false,
      has_any_comorbidities_other: fullBody.has_any_comorbidities_other,
      man_health_last_prostate_exam_date:
        fullBody.man_health_last_prostate_exam_date,
      man_health_last_ist_exam_date: fullBody.man_health_last_ist_exam_date,
      woman_health_last_preventive_exam_date:
        fullBody.woman_health_last_preventive_exam_date,
      woman_health_last_mammography_exam_date:
        fullBody.woman_health_last_mammography_exam_date,
      woman_health_last_gynecological_consultation_exam_date:
        fullBody.woman_health_last_gynecological_consultation_exam_date,
      woman_health_suspected_pregnancy_week_quantity:
        fullBody.woman_health_suspected_pregnancy_week_quantity,
      woman_health_use_some_contraceptive_method:
        fullBody.woman_health_use_some_contraceptive_method ?? false,
      use_condom: fullBody.use_condom ?? false,
      comment_health_situation: fullBody.comment_health_situation,
      person: personId,
      user: userId,
    };
  }

  static mountJudicialSituationData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<JudicialSituation> {
    return {
      has_already_been_through_the_socioeducational_system:
        fullBody.has_already_been_through_the_socioeducational_system ?? false,
      has_already_been_through_the_prision_system:
        fullBody.has_already_been_through_the_prision_system ?? false,
      has_an_active_lawsuit: fullBody.has_an_active_lawsuit ?? false,
      has_outstanding_writ_of_execution:
        fullBody.has_outstanding_writ_of_execution ?? false,
      wear_anklet: fullBody.wear_anklet ?? false,
      is_accompanied_by_a_defender:
        fullBody.is_accompanied_by_a_defender ?? false,
      is_this_follow_up_enough: fullBody.is_this_follow_up_enough ?? false,
      comment_judicial_situation: fullBody.comment_judicial_situation,
      person: personId,
      user: userId,
    };
  }

  static mountInfrastructureData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<Infrastructure> {
    return {
      has_access_to_clean_water: fullBody.has_access_to_clean_water ?? false,
      has_access_to_adequate_toilets:
        fullBody.has_access_to_adequate_toilets ?? false,
      has_access_to_a_bed: fullBody.has_access_to_a_bed ?? false,
      has_access_to_safety_spot: fullBody.has_access_to_safety_spot ?? false,
      place_of_stay_has_adequate_hygiene:
        fullBody.place_of_stay_has_adequate_hygiene ?? false,
      place_of_stay_has_adequate_structure:
        fullBody.place_of_stay_has_adequate_structure ?? false,
      place_of_stay_has_proximity_to_basic_services:
        fullBody.place_of_stay_has_proximity_to_basic_services ?? false,
      place_of_stay_has_adequate_sound_condition:
        fullBody.place_of_stay_has_adequate_sound_condition ?? false,
      has_any_furniture: fullBody.has_any_furniture ?? false,
      comment_infrastructure: fullBody.comment_infrastructure,
      person: personId,
      user: userId,
    };
  }

  static mountSafetyData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<Safety> {
    return {
      quantity_victim_of_crimes_against_property_last_three_months:
        fullBody.quantity_victim_of_crimes_against_property_last_three_months,
      quantity_victim_of_crimes_against_person_last_three_months:
        fullBody.quantity_victim_of_crimes_against_person_last_three_months,
      quantity_victim_of_institutional_violence_last_three_months:
        fullBody.quantity_victim_of_institutional_violence_last_three_months,
      comment_safety: fullBody.comment_safety,
      person: personId,
      user: userId,
    };
  }

  static mountStreetPathData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<StreetPath> {
    return {
      is_currently_homeless: fullBody.is_currently_homeless ?? false,
      time_homeless: fullBody.time_homeless,
      homeless_reason: fullBody.homeless_reason,
      had_any_family_ties_interrupted_quantity:
        fullBody.had_any_family_ties_interrupted_quantity,
      already_been_in_shelter_quantity_months:
        fullBody.already_been_in_shelter_quantity_months,
      already_been_in_hostel_quantity_months:
        fullBody.already_been_in_hostel_quantity_months,
      time_lived_in_bh_months: fullBody.time_lived_in_bh_months,
      lived_on_streets_in_another_city:
        fullBody.lived_on_streets_in_another_city,
      any_family_member_have_been_homeless:
        fullBody.any_family_member_have_been_homeless,
      reason_past_street_path_unemployment:
        fullBody.reason_past_street_path_unemployment ?? false,
      reason_past_street_path_family_problems:
        fullBody.reason_past_street_path_family_problems ?? false,
      reason_past_street_path_drugs:
        fullBody.reason_past_street_path_drugs ?? false,
      reason_past_street_path_comment: fullBody.reason_past_street_path_comment,
      time_past_street_path: fullBody.time_past_street_path,
      comment_street_path: fullBody.comment_street_path,
      person: personId,
      user: userId,
    };
  }

  static mountWorkAndIncomeData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<WorkAndIncome> {
    return {
      already_has_paid_work: fullBody.already_has_paid_work ?? false,
      describe_past_paid_work: fullBody.describe_past_paid_work,
      work_type: fullBody.work_type,
      participate_in_any_income_generation_projects:
        fullBody.participate_in_any_income_generation_projects ?? false,
      what_is_being_done_to_get_out_of_this_situation:
        fullBody.what_is_being_done_to_get_out_of_this_situation,
      retirement_benefit_value: fullBody.retirement_benefit_value,
      continuing_provision_benefit_value:
        fullBody.continuing_provision_benefit_value,
      sick_pay_benefit_value: fullBody.sick_pay_benefit_value,
      bolsa_familia_benefit_value: fullBody.bolsa_familia_benefit_value,
      brazil_financial_assistance_benefit_value:
        fullBody.brazil_financial_assistance_benefit_value,
      other_benefit_value: fullBody.other_benefit_value,
      family_average_monthly_income_value:
        fullBody.family_average_monthly_income_value,
      past_work_category: fullBody.past_work_category,
      past_work_sector: fullBody.past_work_sector,
      comment_work_and_income: fullBody.comment_work_and_income,
      person: personId,
      user: userId,
    };
  }

  static mountFamilyReferencesData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<FamilyReferences> {
    return {
      description: fullBody.description,
      comment_family_references: fullBody.comment_family_references,
      person: personId,
      user: userId,
    };
  }

  static mountSocialAssistanceNetworkData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<SocialAssistanceNetwork> {
    return {
      is_attended_to_a_network_services:
        fullBody.is_attended_to_a_network_services ?? false,
      has_crea_service: fullBody.has_crea_service ?? false,
      has_cras_service: fullBody.has_cras_service ?? false,
      has_shelter_service: fullBody.has_shelter_service ?? false,
      has_council_of_rights_service:
        fullBody.has_council_of_rights_service ?? false,
      has_health_service: fullBody.has_health_service ?? false,
      has_education_service: fullBody.has_education_service ?? false,
      has_pastoral_povo_da_rua_service:
        fullBody.has_pastoral_povo_da_rua_service ?? false,
      comment_social_assistance_network:
        fullBody.comment_social_assistance_network,
      person: personId,
      user: userId,
    };
  }

  static mountPersonVacancyReservationBenefitData(
    fullBody: { [key: string]: any },
    personId: number,
    userId: number,
  ): Partial<PersonVacancyReservationBenefit> {
    return {
      has_vacancy_reservation_benefits_egress_prision_system:
        fullBody.has_vacancy_reservation_benefits_egress_prision_system,
      has_vacancy_reservation_benefits_lgbt:
        fullBody.has_vacancy_reservation_benefits_lgbt,
      has_vacancy_reservation_benefits_others:
        fullBody.has_vacancy_reservation_benefits_others,
      has_vacancy_reservation_benefits_pcd:
        fullBody.has_vacancy_reservation_benefits_pcd,
      has_vacancy_reservation_benefits_racial_quota:
        fullBody.has_vacancy_reservation_benefits_racial_quota,
      details_person_vacancy_reservation_benefit:
        fullBody.details_person_vacancy_reservation_benefit,
      person: personId,
      user: userId,
    };
  }

  static savePerson = async (
    formData: {
      [key: string]: unknown;
    },
    userId: number,
    personInformation?: PersonCompleteData | null,
  ): Promise<PersonCompleteData> => {
    const body = { ...formData };

    Object.keys(body)?.forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    const personId = personInformation?.person.id ?? null;

    const saveMethod =
      personId !== null
        ? Api.put<Person>(`people/${personId}`, body)
        : Api.post<Person>('people', this.mountPersonData(body, userId));

    const { status, data } = await saveMethod;

    if (status !== 200) throw new Error();

    const saveCultureMethod =
      personId !== null && personInformation?.culture.id
        ? Api.put<Culture>(`cultures/${personInformation?.culture.id}`, body)
        : Api.post<Culture>(
            'cultures',
            this.mountCultureData(body, data.id, userId),
          );

    const saveEducationMethod =
      personId !== null && personInformation?.education.id
        ? Api.put<Education>(
            `educations/${personInformation?.education.id}`,
            body,
          )
        : Api.post<Education>(
            'educations',
            this.mountEducationData(body, data.id, userId),
          );

    const saveFamilyReferencesMethod =
      personId !== null && personInformation?.familyReferences.id
        ? Api.put<FamilyReferences>(
            `family-references/${personInformation?.familyReferences.id}`,
            body,
          )
        : Api.post<FamilyReferences>(
            'family-references',
            this.mountFamilyReferencesData(body, data.id, userId),
          );

    const saveHealthSituationMethod =
      personId !== null && personInformation?.healthSituation.id
        ? Api.put<HealthSituation>(
            `health-situations/${personInformation?.healthSituation.id}`,
            body,
          )
        : Api.post<HealthSituation>(
            'health-situations',
            this.mountHealthSituationData(body, data.id, userId),
          );

    const saveInfrastructureMethod =
      personId !== null && personInformation?.infrastructure.id
        ? Api.put<Infrastructure>(
            `infrastructures/${personInformation?.infrastructure.id}`,
            body,
          )
        : Api.post<Infrastructure>(
            'infrastructures',
            this.mountInfrastructureData(body, data.id, userId),
          );

    const saveJudicialSituationMethod =
      personId !== null && personInformation?.judicialSituation.id
        ? Api.put<JudicialSituation>(
            `judicial-situations/${personInformation?.judicialSituation.id}`,
            body,
          )
        : Api.post<JudicialSituation>(
            'judicial-situations',
            this.mountJudicialSituationData(body, data.id, userId),
          );

    const savePersonVacancyReservationBenefitMethod =
      personId !== null && personInformation?.personVacancyReservationBenefit.id
        ? Api.put<PersonVacancyReservationBenefit>(
            `person-vacancy-reservation-benefits/${personInformation?.personVacancyReservationBenefit.id}`,
            body,
          )
        : Api.post<PersonVacancyReservationBenefit>(
            'person-vacancy-reservation-benefits',
            this.mountPersonVacancyReservationBenefitData(
              body,
              data.id,
              userId,
            ),
          );

    const saveSafetyMethod =
      personId !== null && personInformation?.safeties.id
        ? Api.put<Safety>(`safeties/${personInformation?.safeties.id}`, body)
        : Api.post<Safety>(
            'safeties',
            this.mountSafetyData(body, data.id, userId),
          );

    const saveSocialAssistanceNetworkMethod =
      personId !== null && personInformation?.socialAssistanceNetwork.id
        ? Api.put<SocialAssistanceNetwork>(
            `social-assistance-networks/${personInformation?.socialAssistanceNetwork.id}`,
            body,
          )
        : Api.post<SocialAssistanceNetwork>(
            'social-assistance-networks',
            this.mountSocialAssistanceNetworkData(body, data.id, userId),
          );

    const saveStreetPathMethod =
      personId !== null && personInformation?.streetPaths.id
        ? Api.put<StreetPath>(
            `street-paths/${personInformation?.streetPaths.id}`,
            body,
          )
        : Api.post<StreetPath>(
            'street-paths',
            this.mountStreetPathData(body, data.id, userId),
          );

    const saveWorkAndIncomeMethod =
      personId !== null && personInformation?.workAndIncomes.id
        ? Api.put<WorkAndIncome>(
            `work-and-incomes/${personInformation?.workAndIncomes.id}`,
            body,
          )
        : Api.post<WorkAndIncome>(
            'work-and-incomes',
            this.mountWorkAndIncomeData(body, data.id, userId),
          );

    const promises = await Promise.all([
      saveCultureMethod,
      saveEducationMethod,
      saveFamilyReferencesMethod,
      saveHealthSituationMethod,
      saveInfrastructureMethod,
      saveJudicialSituationMethod,
      savePersonVacancyReservationBenefitMethod,
      saveSafetyMethod,
      saveSocialAssistanceNetworkMethod,
      saveStreetPathMethod,
      saveWorkAndIncomeMethod,
    ]);

    if (promises.some((prom) => prom.status !== 200)) throw new Error();

    return {
      culture: promises[0].data,
      education: promises[1].data,
      familyReferences: promises[2].data,
      healthSituation: promises[3].data,
      infrastructure: promises[4].data,
      judicialSituation: promises[5].data,
      person: data,
      personVacancyReservationBenefit: promises[6].data,
      safeties: promises[7].data,
      socialAssistanceNetwork: promises[8].data,
      streetPaths: promises[9].data,
      workAndIncomes: promises[10].data,
    };
  };
}

export default PeopleService;
