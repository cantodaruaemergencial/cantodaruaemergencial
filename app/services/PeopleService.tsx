import moment, { isMoment, Moment } from 'moment';

import { Api } from '#/packages/api/strapi';
import { FieldType, Form, FormFieldOption, FormSection } from '#/types/Forms';
import {
  BasePerson,
  Person,
  GeneralOption,
  PersonCompleteData,
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

  static getVacancyReservationBenefits = () =>
    Api.publicGet<GeneralOption[]>('vacancy-reservation-benefits').then(
      (res) => res.data,
    );

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
    Api.get<PersonCompleteData>(`general-dara/person/${personId}`).then(
      (res) => res.data,
    );

  static getPersonForm = async (personId: number | null): Promise<Form> => {
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
      vacancyReservationBenefits,
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
      PeopleService.getVacancyReservationBenefits(),
      PeopleService.getDrugsFrequency(),
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
            label: 'Nome da Mãe',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'FatherName',
            value: person?.FatherName,
            label: 'Nome do Pai',
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
            property: 'Nationality',
            value: person?.Nationality,
            label: 'Nacionalidade',
            description: 'Exemplo: Brasileiro',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Occupation',
            value: person?.Occupation,
            label: 'Ocupação',
            description: 'Profissão',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: true,
            },
          },
          {
            property: 'Email',
            value: person?.Email,
            label: 'E-mail',
            description: '',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
            rules: {
              required: false,
            },
          },
          {
            property: 'ContactPhone',
            label: 'Telefone de Contato',
            value: person?.ContactPhone,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'BirthDocument',
            label: 'Número Certidão de Nascimento',
            value: person?.BirthDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'WeddingDocument',
            label: 'Número Certidão de Casamento',
            value: person?.WeddingDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'RgDocument',
            label: 'Número Documento RG',
            value: person?.RgDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'CPFDocument',
            label: 'Número Documento CPF',
            value: person?.CpfDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'ReservistDocument',
            label: 'Número do Certificado de Reservista',
            value: person?.ReservistDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'VoterRegistrationDocument',
            label: 'Número do Título de Eleitor',
            value: person?.VoterRegistrationDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'CNHDocument',
            label: 'Número Documento CNH',
            value: person?.CnhDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'CTPSDocument',
            label: 'Número Documento CTPS',
            value: person?.CtpsDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'NISDocument',
            label: 'Número Documento NIS',
            value: person?.NisDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'CADUNIDocument',
            label: 'Número Documento CADUNI',
            value: person?.CadUniDocument,
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'hasGovBrRegistration',
            label: 'Possui registro no Gov BR?',
            value: person?.HasGovBrRegistration,
            type: FieldType.boolean,
            rules: {
              required: false,
            },
          },
          {
            property: 'Gender',
            value: person?.Gender?.id,
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
            property: 'SelfDeclaration',
            value: person?.SelfDeclaration?.id,
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
            property: 'MaritalStatus',
            label: 'Situação Civil',
            value: person?.Marital_status?.id,
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
            property: 'SexualOrientation',
            label: 'Orientação Sexual',
            value: person?.SexualOrientation?.id,
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
            property: 'ChildQuantity',
            value: person?.ChildQuantity,
            label: 'Número de Filhos',
            type: FieldType.number,
            rules: {
              required: true,
            },
          },
          {
            property: 'ChildCarePerson',
            value: person?.ChildCarePerson,
            label: 'Quem cuida dos filhos?',
            type: FieldType.input,
            rules: {
              required: false,
            },
          },
          {
            property: 'Comment',
            value: person?.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
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
            property: 'IsCurrentlyStudying',
            value: personCompleteData?.education.IsCurrentlyStudying,
            label: 'Está atualmente estudando?',
            type: FieldType.boolean,
          },
          {
            property: 'StudyDegree',
            label: 'Escolaridade',
            value: personCompleteData?.education.StudyDegree.id,
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
            property: 'IsInterestedReturningStudying',
            value: personCompleteData?.education.IsCurrentlyStudying,
            label: 'Está interessada em voltar a estudar?',
            type: FieldType.boolean,
          },
          {
            property: 'HsExtraCourses',
            value: personCompleteData?.education.HasExtraCourse,
            label: 'Possui algum curso além da escola regular?',
            type: FieldType.boolean,
          },
          {
            property: 'IsInterestedToDoSomeCourse',
            value: personCompleteData?.education.IsInterestedToDoSomeCourse,
            label: 'Está interessada(o) em fazer algum curso?',
            type: FieldType.boolean,
          },
          {
            property: 'DesiredExtraCourse',
            value: personCompleteData?.education.DesiredExtraCourse,
            label: 'Descreva os cursos de interesse',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Cultura',
        fields: [
          {
            property: 'ExercisesPracticed',
            value: personCompleteData?.culture.ExercisesPraticed,
            label: 'Pratica exercício físico? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'ExercisesQuantityByWeek',
            value: personCompleteData?.culture.ExercisesQuantityByWeek,
            label: 'Quantidade de vezes por semana que pratica exercício',
            type: FieldType.number,
          },
          {
            property: 'KnowSomeCulturalPlace',
            value: personCompleteData?.culture.KnowSomeCulturalPlace,
            label: 'Conhece algum espaço cultural?',
            description:
              'Biblioteca, teatro, cinemas, centros culturais, parques e praças públicas, estádio, etc.',
            type: FieldType.boolean,
          },
          {
            property: 'UsuallyGoToSomeCulturePlace',
            value: personCompleteData?.culture.UsuallyGoToSomeCulturalPlace,
            label: 'Frequenta algum espaço cultural?',
            description:
              'Biblioteca, teatro, cinemas, centros culturais, parques e praças públicas, estádio, etc.',
            type: FieldType.boolean,
          },
          {
            property: 'WentSomewherePlaceLastTwelveMonths',
            value: personCompleteData?.culture.WentSomewherePlaceLast12Months,
            label: 'Foi em algum espaço cultural nos últimos 12 meses?',
            description: 'Algum show ou espaço cultural da cidade',
            type: FieldType.boolean,
          },
          {
            property: 'HasReadingHabit',
            value: personCompleteData?.culture.HasReadingHabit,
            label: 'Tem hábito de ler?',
            type: FieldType.boolean,
          },
          {
            property: 'HasListeningMusicHabit',
            value: personCompleteData?.culture.HasListeningMusicHabit,
            label: 'Tem hábito de ouvir música?',
            type: FieldType.boolean,
          },
          {
            property: 'HasDrawingHabit',
            value: personCompleteData?.culture.HasDrawingHabit,
            label: 'Tem hábito de desenhar?',
            type: FieldType.boolean,
          },
          {
            property: 'OtherHabit',
            value: personCompleteData?.culture.OtherHabit,
            label: 'Tem outros hábitos? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          // {
          //   property: 'benefits',
          //   value: (person?.SelfDeclaration || []).map((b) => b.id),
          //   label: 'Recebe algum benefício?',
          //   type: FieldType.selectMultiple,
          //   options: selfDeclaration.map(
          //     (b): FormFieldOption => ({
          //       value: b.id,
          //       label: b.benefit,
          //     }),
          //   ),
          // },
        ],
      },
      {
        label: 'Situação Judicial',
        fields: [
          {
            property: 'HasAlreadyBeenThroughTheSocioeducacionalSystem',
            value:
              personCompleteData?.judicialSituation
                .HasAlreadyBeenThroughTheSocioeducationalSystem,
            label: 'Já passou pelo sistema socioeducativo?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAlreadyBeenThroughThePrisionSystem',
            value:
              personCompleteData?.judicialSituation
                .HasAlreadyBeenThroughThePrisionSystem,
            label: 'Já passou pelo sistema prisional?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnActiveLawsuit',
            value: personCompleteData?.judicialSituation.HasAnActiveLawsuit,
            label: 'Possui algum processo judicial ativo?',
            type: FieldType.boolean,
          },
          {
            property: 'HasOutstandingWritOfExecution',
            value:
              personCompleteData?.judicialSituation
                .HasAnOutstandingWritOfExecution,
            label: 'Possui mandado de execução em aberto?',
            type: FieldType.boolean,
          },
          {
            property: 'WearAnklet',
            value: personCompleteData?.judicialSituation.WearAnklet,
            label: 'Usa tornozeleira eletrônica?',
            type: FieldType.boolean,
          },
          {
            property: 'IsAccompaniedByADefender',
            value:
              personCompleteData?.judicialSituation.IsAccompaniedByADefender,
            label: 'Está sendo acompanhado por defensor',
            type: FieldType.boolean,
          },
          {
            property: 'IsThisFollowUpEnough',
            value:
              personCompleteData?.judicialSituation.IsAccompaniedByADefender,
            label: 'Este acompanhamento está sendo suficiente?',
            type: FieldType.boolean,
          },
          {
            property: 'Observation',
            value: personCompleteData?.judicialSituation.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Infraestrutura',
        fields: [
          {
            property: 'HasAccessToCleanWater',
            value: personCompleteData?.infrastructure.HasAccessToCleanWater,
            label: 'Tem acesso diário a água potável?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAccessToAdequateToilets',
            value:
              personCompleteData?.infrastructure.HasAccessToAdequateToilets,
            label: 'Tem acesso diário a sanitário adequado?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAccessToSafetySpot',
            value: personCompleteData?.infrastructure.HasAccessToSafetySpot,
            label: 'Tem acesso diário a um lugar seguro?',
            description:
              'Cama para pernoitar e lugar fechado para se abrigar da chuva e sol',
            type: FieldType.boolean,
          },
          {
            property: 'PlaceOfStayHasAdequateHygiene',
            value:
              personCompleteData?.infrastructure.PlaceOfStayHasAdequateHygiene,
            label: 'O lugar de estadia tem higiene adequada?',
            type: FieldType.boolean,
          },
          {
            property: 'PlaceOfStayHasAdequateStructure',
            value:
              personCompleteData?.infrastructure
                .PlaceOfStayHasAdequateStructure,
            label: 'O lugar de estadia tem estrutura adequada?',
            description:
              'Materiais utilizados, tamanho, disposição de cômodos, iluminação e ventilação',
            type: FieldType.boolean,
          },
          {
            property: 'PlaceOfStayHasProximityToBasicServices',
            value:
              personCompleteData?.infrastructure
                .PlaceOfStayHasProximityToBasicServices,
            label: 'O lugar de estadia é próximo de serviços básicos?',
            description: 'Mercado, escola, hospitais, transporte público, etc',
            type: FieldType.boolean,
          },
          {
            property: 'PlaceOfStayHasAdequateSoundCondition',
            value:
              personCompleteData?.infrastructure
                .PlaceOfStayHasAdequateSoundCondition,
            label: 'O lugar de estadia tem condição sonora adequada?',
            description: 'Sem barulho ou ruídos que perturbem o descanso',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyFurniture',
            value: personCompleteData?.infrastructure.HasAnyFurniture,
            label: 'Você possui alguma mobília?',
            type: FieldType.boolean,
          },
          {
            property: 'Observation',
            value: personCompleteData?.infrastructure.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Segurança',
        fields: [
          {
            property: 'VictimOfCrimesAgainstPropertyLastThreeMonths',
            value:
              personCompleteData?.safeties
                .VictimOfCrimesAgainstPropertyLastThreeMonths,
            label: 'Foi vítima de crime contra a propridade (Últimos 3 meses)?',
            type: FieldType.boolean,
          },
          {
            property: 'VictimOfCrimesAgainstPerson',
            value:
              personCompleteData?.safeties
                .VictimOfCrimesAgainstPersonLastThreeMonths,
            label: 'Foi vítima de crime contra a pessoa (Últimos 3 meses)?',
            type: FieldType.boolean,
          },
          {
            property: 'VictimOfInstitucionalViolenceLastThreeMonths',
            value:
              personCompleteData?.safeties
                .VictimOfInstitucionalViolenceLastThreeMonths,
            label:
              'Foi vítima de crime de violência institucional (Últimos 3 meses)?',
            type: FieldType.boolean,
          },
          {
            property: 'Observation',
            value: personCompleteData?.judicialSituation.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Trajetória de Rua',
        fields: [
          {
            property: 'IsCurrentlyHomeless',
            value: personCompleteData?.streetPaths.IsCurrentlyHomeless,
            label: 'Atualmente é morador de rua?',
            type: FieldType.boolean,
          },
          {
            property: 'TimeHomeless',
            value: personCompleteData?.streetPaths.TimeHomeless,
            label: 'Tempo morando na rua',
            type: FieldType.number,
          },
          {
            property: 'HomelessReason',
            value: personCompleteData?.streetPaths.HomelessReason,
            label: 'Motivo de estar na rua',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HadAnyFamilyTiesInterrupted',
            value: personCompleteData?.streetPaths.HadAnyFamilyTiesInterrupted,
            label:
              'Possui algum vínculo familiar interrompido? Se sim, quantos?',
            type: FieldType.number,
          },
          {
            property: 'AlreadyBeenInShelter',
            value: personCompleteData?.streetPaths.AlreadyBeenInShelter,
            label: 'Já esteve em um abrigo? Se sim, por quantos meses?',
            type: FieldType.number,
          },
          {
            property: 'AlreadyBeenInHostel',
            value: personCompleteData?.streetPaths.AlreadyBeenInHostel,
            label: 'Já esteve em uma pensão? Se sim, por quantos meses?',
            type: FieldType.number,
          },
          {
            property: 'TimeLivedInBH',
            value: personCompleteData?.streetPaths.TimeLivedInBH,
            label:
              'Há quanto tempo mora em Belo Horizonte? (Quantidade em meses)',
            type: FieldType.number,
          },
          {
            property: 'LivedOnTheStreetsInAnotherCity',
            value:
              personCompleteData?.streetPaths.LivedOnTheStreetsInAnotherCity,
            label: 'Já morou em outra cidade? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'AnyFamilyMemberHaveBeenHomeless',
            value:
              personCompleteData?.streetPaths.AnyFamilyMemberHaveBeenHomeless,
            label:
              'Algum membro da família já foi morador de rua? Se sim, quem?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'ReasonPastStreetPathUnemployment',
            value:
              personCompleteData?.streetPaths.ReasonPastStreetPathUnemployment,
            label: 'O motivo de estar na rua é desemprego?',
            type: FieldType.boolean,
          },
          {
            property: 'ReasonPastStreetPathFamilyProblems',
            value:
              personCompleteData?.streetPaths
                .ReasonPastStreetPathFamilyProblems,
            label: 'O motivo de estar na rua é problemas familiares?',
            type: FieldType.boolean,
          },
          {
            property: 'ReasonPastStreetPathDrugs',
            value: personCompleteData?.streetPaths.ReasonPastStreetPathDrugs,
            label: 'O motivo de estar na rua é drogas?',
            type: FieldType.boolean,
          },
          {
            property: 'ReasonPastStreetPathComment',
            value: personCompleteData?.streetPaths.ReasonPastStreetPathComment,
            label: 'Há outros motivos por ser morador de rua? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'TimePastStreetPath',
            value: personCompleteData?.streetPaths.TimePastStreetPath,
            label: 'Já morou na rua antes? Quanto tempo? Em meses',
            type: FieldType.number,
          },
          {
            property: 'Observation',
            value: personCompleteData?.streetPaths.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Trabalho e renda',
        fields: [
          {
            property: 'AlreadyHasAPaidWork',
            value: personCompleteData?.workAndIncomes.AlreadyHasAPaidWork,
            label: 'Já possuiu um trabalho remunerado?',
            type: FieldType.boolean,
          },
          {
            property: 'DescribePastPaidWork',
            value: personCompleteData?.workAndIncomes.DescribePastPaidWork,
            label: 'Descreva quais trabalhos já possuiu',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'DoYouCurrentlyWork',
            label: 'Trabalha atualmente?',
            value: personCompleteData?.workAndIncomes?.DoYouCurrentlyWork.id,
            type: FieldType.select,
            options: workTypes.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'ParticipateInAnyIncomeGenerationProjects',
            value:
              personCompleteData?.workAndIncomes
                .ParticipateInAnyIncomeGenerationProjects,
            label: 'Já participou de algum projeto de geração de renda?',
            type: FieldType.boolean,
          },
          {
            property: 'WhatIsBeingDoneToGetOutOfThisSituation',
            value:
              personCompleteData?.workAndIncomes
                .WhatIsBeingDoneToGetOutOfThisSituation,
            label: 'O que está sendo feito para sair dessa situação?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'RetirementBenefitValue',
            value: personCompleteData?.workAndIncomes.RetirementBenefitValue,
            label: 'Possui auxílio de aposentadoria? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'ContinuingProvisionBenefitValue',
            value:
              personCompleteData?.workAndIncomes
                .ContinuingProvisionBenefitValue,
            label:
              'Possui auxílio de provisão continuada? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'SickPayBenefitValue',
            value: personCompleteData?.workAndIncomes.SickPayBenefitValue,
            label: 'Possui auxílio doença? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'BolsaFamiliaBenefitValue',
            value: personCompleteData?.workAndIncomes.BolsaFamiliaBenefitValue,
            label: 'Possui auxílio de Bolsa Família? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'BrazilFinancialAssistanceBenefitValue',
            value:
              personCompleteData?.workAndIncomes
                .BrazilFinancialAssistanceBenefitValue,
            label: 'Possui auxílio Brasil? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'OtherBenefitValue',
            value: personCompleteData?.workAndIncomes.OtherBenefitValue,
            label: 'Possui outro auxílio? Se sim, qual o valor?',
            type: FieldType.number,
          },
          {
            property: 'FamilysAverageMonthlyIncome',
            value:
              personCompleteData?.workAndIncomes.FamilysAverageMonthlyIncome,
            label: 'Renda média familiar mensal',
            type: FieldType.number,
          },
          {
            property: 'CategoryPastPaidWork',
            label: 'Em qual categoria já trabalhou?',
            value: personCompleteData?.workAndIncomes?.CategoryPastPaidWork.id,
            type: FieldType.select,
            options: pastWorkCategories.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'SectorPastPaidWork',
            label: 'Em qual setor já trabalhou?',
            value: personCompleteData?.workAndIncomes?.SectorPastPaidWork.id,
            type: FieldType.select,
            options: pastWorkSectors.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'Observation',
            value: personCompleteData?.judicialSituation.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Referências Familiares',
        fields: [
          {
            property: 'Description',
            value: personCompleteData?.familyReferences.Description,
            label: 'Quem são as pessoas de referência na família?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'Observation',
            value: personCompleteData?.familyReferences.Comment,
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
            property: 'IsAttendedToANetworkServices',
            value:
              personCompleteData?.socialAssistanceNetwork
                .IsAttendedToANetworkServices,
            label: 'É atendido por uma rede de serviços?',
            type: FieldType.boolean,
          },
          {
            property: 'HasCREAService',
            value: personCompleteData?.socialAssistanceNetwork.HasCREAService,
            label: 'Possui CREA?',
            type: FieldType.boolean,
          },
          {
            property: 'HasCRASService',
            value: personCompleteData?.socialAssistanceNetwork.HasCRASService,
            label: 'Possui CRAS?',
            type: FieldType.boolean,
          },
          {
            property: 'HasShelterService',
            value:
              personCompleteData?.socialAssistanceNetwork.HasShelterService,
            label: 'Possui Abrigo?',
            type: FieldType.boolean,
          },
          {
            property: 'HasCouncilOfRightsService',
            value:
              personCompleteData?.socialAssistanceNetwork
                .HasCouncilOfRightsService,
            label: 'Possui conselho de serviços de direito?',
            type: FieldType.boolean,
          },
          {
            property: 'HasHealthService',
            value: personCompleteData?.socialAssistanceNetwork.HasHealthService,
            label: 'Possui serviço de saúde?',
            type: FieldType.boolean,
          },
          {
            property: 'HasEducationService',
            value:
              personCompleteData?.socialAssistanceNetwork.HasEducationService,
            label: 'Possui serviço de educação?',
            type: FieldType.boolean,
          },
          {
            property: 'HasPastoralDeRuaService',
            value:
              personCompleteData?.socialAssistanceNetwork
                .HasPastoralDeRuaService,
            label: 'Possui Pastoral de Rua?',
            type: FieldType.boolean,
          },
          {
            property: 'Observation',
            value: personCompleteData?.socialAssistanceNetwork.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Benefício de reserva de vagas',
        fields: [
          {
            property: 'VacancyReservationBenefit',
            label: 'Possui algum benefício de vaga?',
            value:
              personCompleteData?.personVacancyReservationBenefit
                ?.VacancyReservationBenefit.id,
            type: FieldType.select,
            options: vacancyReservationBenefits.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'Details',
            value: personCompleteData?.personVacancyReservationBenefit.Details,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      {
        label: 'Saúde',
        fields: [
          {
            property: 'SelfHealthEvaluation',
            value: personCompleteData?.healthSituation.SelfHealthEvaluation,
            label: 'Autoavaliação da saúde',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'DateLastMedicalAppointment',
            value: personCompleteData?.healthSituation
              .DateLastMedicalAppointment
              ? moment(
                  personCompleteData?.healthSituation
                    .DateLastMedicalAppointment,
                )
              : null,
            label: 'Data da última avaliação médica',
            type: FieldType.date,
          },
          {
            property: 'DateLastMedicalDentist',
            value: personCompleteData?.healthSituation.DateLastMedicalDentist
              ? moment(
                  personCompleteData?.healthSituation.DateLastMedicalDentist,
                )
              : null,
            label: 'Data da última avaliação no dentista',
            type: FieldType.date,
          },
          {
            property: 'UseMedicationOften',
            value: personCompleteData?.healthSituation.UseMedicationOften,
            label: 'Usa medicação frequente?',
            type: FieldType.boolean,
          },
          {
            property: 'MedicationDetails',
            value: personCompleteData?.healthSituation.MedicationDetails,
            label: 'Quais são as medicações frequentes?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'WasHospitalizedLastTwelveMonths',
            value:
              personCompleteData?.healthSituation
                .WasHospitalizedLastTwelveMonths,
            label: 'Foi hospitalizado nos últimos 12 meses?',
            type: FieldType.boolean,
          },
          {
            property: 'HospitalizedReason',
            value: personCompleteData?.healthSituation.HospitalizedReason,
            label: 'Motivo da hospitalização',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'TimeHospitalizedReasonDays',
            value:
              personCompleteData?.healthSituation.TimeHospitalizedReasonDays,
            label: 'Tempo hospitalizado (em meses)',
            type: FieldType.number,
          },
          {
            property: 'DidAnySurgery',
            value: personCompleteData?.healthSituation.DidAnySurgery,
            label: 'Já fez alguma cirurgia? Se sim, qual?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasVaccinationCard',
            value: personCompleteData?.healthSituation.HasVaccinationCard,
            label: 'Possui cartão de vacinação?',
            type: FieldType.boolean,
          },
          {
            property: 'IsUpdatedVaccinationCovid19',
            value:
              personCompleteData?.healthSituation.IsUpdatedVaccinationCovid19,
            label: 'Tomou a vacina contra COVID19?',
            type: FieldType.boolean,
          },
          {
            property: 'IsUpdatedVaccinationHepatite',
            value:
              personCompleteData?.healthSituation.IsUpdatedVaccinationHepatite,
            label: 'Tomou a vacina contra Hepatite?',
            type: FieldType.boolean,
          },
          {
            property: 'IsUpdatedVaccinationTetano',
            value:
              personCompleteData?.healthSituation.IsUpdatedVaccinationTetano,
            label: 'Tomou a vacina contra Tetano?',
            type: FieldType.boolean,
          },
          {
            property: 'IsUpdatedVaccinationInfluenza',
            value:
              personCompleteData?.healthSituation.IsUpdatedVaccinationInfluenza,
            label: 'Tomou a vacina contra Influenza?',
            type: FieldType.boolean,
          },
          {
            property: 'IsUpdatedVaccinationFebreAmarela',
            value:
              personCompleteData?.healthSituation
                .IsUpdatedVaccinationFebreAmarela,
            label: 'Tomou a vacina contra Febre Amarela?',
            type: FieldType.boolean,
          },
          {
            property: 'QuestionsRegardingPhysicalOrMentalHealth',
            value:
              personCompleteData?.healthSituation
                .QuestionsRegardingPhysicalOrMentalHealth,
            label: 'Possui alguma dúvida sobre sua saúde física ou mental?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'DoSomeFollowUp',
            value: personCompleteData?.healthSituation.DoSomeFollowUp,
            label: 'Faz algum acompanhamento? Se sim, qual?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'UseAlcoholOrOtherDrugs',
            value: personCompleteData?.healthSituation.UseAlcoholOrOtherDrugs,
            label: 'Usa alcool ou outras drogas? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'DrugsFrequency',
            label: 'Frequência de uso da droga',
            value: personCompleteData?.healthSituation?.DrugsFrequency.id,
            type: FieldType.select,
            options: drugsFrequency.map(
              (ms): FormFieldOption => ({
                value: ms.id,
                label: ms.name,
              }),
            ),
          },
          {
            property: 'HasEverBeenAdmittedToTherapeuticCommunity',
            value:
              personCompleteData?.healthSituation
                .HasEverBeenAdmittedToTherapeuticCommunity,
            label:
              'Já foi admitido em uma comunidade terapêutica? Se sim, quais?',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'NeedDentalCare',
            value: personCompleteData?.healthSituation.NeedDentalCare,
            label: 'Precisa de tratamento dental?',
            type: FieldType.boolean,
          },
          {
            property: 'DescribeDentalCare',
            value: personCompleteData?.healthSituation.DescribeDentalCare,
            label: 'Descreva o tratamento dental necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'NeedPsychologicalCare',
            value: personCompleteData?.healthSituation.NeedPsychologicalCare,
            label: 'Precisa de tratamento psicológico?',
            type: FieldType.boolean,
          },
          {
            property: 'DescribePsychologicalCare',
            value:
              personCompleteData?.healthSituation.DescribePsychologicalCare,
            label: 'Descreva o tratamento psicológico necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'NeedPsychiatricCare',
            value: personCompleteData?.healthSituation.NeedPsychiatricCare,
            label: 'Precisa de tratamento psiquiátrico?',
            type: FieldType.boolean,
          },
          {
            property: 'DescribePsychiatricCare',
            value: personCompleteData?.healthSituation.DescribePsychiatricCare,
            label: 'Descreva o tratamento psiquiátrico necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'OtherSpecificCare',
            value: personCompleteData?.healthSituation.OtherSpecificCare,
            label: 'Descreva outro tratamento necessário',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasAnyDisabilities',
            value: personCompleteData?.healthSituation.HasAnyDisabilities,
            label: 'Possui alguma deficiência? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'DescribeNeedSpecialEquipment',
            value:
              personCompleteData?.healthSituation.DescribeNeedSpecialEquipment,
            label: 'Precisa de algum equipamento especial? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'HasAnyCommorbitiesHipertensao',
            value:
              personCompleteData?.healthSituation.HasAnyCommorbitiesHipertensao,
            label: 'Possui Hipertensão?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesDiabetes',
            value:
              personCompleteData?.healthSituation.HasAnyCommorbitiesDiabetes,
            label: 'Possui Diabetes?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesCardiovascularProblem',
            value:
              personCompleteData?.healthSituation
                .HasAnyCommorbitiesCardiovascularProblem,
            label: 'Possui problema cardiovascular?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesDepression',
            value:
              personCompleteData?.healthSituation.HasAnyCommorbitiesDepression,
            label: 'Possui depressão?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesAsma',
            value: personCompleteData?.healthSituation.HasAnyCommorbitiesAsma,
            label: 'Possui asma?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesCancer',
            value: personCompleteData?.healthSituation.HasAnyCommorbitiesCancer,
            label: 'Possui câncer?',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesNone',
            value: personCompleteData?.healthSituation.HasAnyCommorbitiesNone,
            label: 'Não possui comorbidade',
            type: FieldType.boolean,
          },
          {
            property: 'HasAnyCommorbitiesOther',
            value: personCompleteData?.healthSituation.HasAnyCommorbitiesOther,
            label: 'Há alguma outra comorbidade? Descreva',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
          {
            property: 'MenHealthLastProstateExamDate',
            value: personCompleteData?.healthSituation
              .MenHealthLastProstateExamDate
              ? moment(
                  personCompleteData?.healthSituation
                    .MenHealthLastProstateExamDate,
                )
              : null,
            label: 'Saúde do Homem - Data do último exame de próstata',
            type: FieldType.date,
          },
          {
            property: 'MenHealthLastIstExamDate',
            value: personCompleteData?.healthSituation.MenHealthLastIstExamDate
              ? moment(
                  personCompleteData?.healthSituation.MenHealthLastIstExamDate,
                )
              : null,
            label: 'Saúde do Homem - Data do último exame de X',
            type: FieldType.date,
          },
          {
            property: 'WomanHealthLastPreventiveExamDate',
            value: personCompleteData?.healthSituation
              .WomanHealthLastPreventiveExamDate
              ? moment(
                  personCompleteData?.healthSituation
                    .WomanHealthLastPreventiveExamDate,
                )
              : null,
            label: 'Saúde da Mulher - Data do último exame preventivo',
            type: FieldType.date,
          },
          {
            property: 'WomanHealthLastMammographyExamDate',
            value: personCompleteData?.healthSituation
              .WomanHealthLastMammographyExamDate
              ? moment(
                  personCompleteData?.healthSituation
                    .WomanHealthLastMammographyExamDate,
                )
              : null,
            label: 'Saúde da Mulher - Data do último exame de mamografia',
            type: FieldType.date,
          },
          {
            property: 'WomanHealthLastGynecologicalConsultationExamDate',
            value: personCompleteData?.healthSituation
              .WomanHealthLastGynecologicalConsultationExamDate
              ? moment(
                  personCompleteData?.healthSituation
                    .WomanHealthLastGynecologicalConsultationExamDate,
                )
              : null,
            label: 'Saúde da Mulher - Data do último exame ginecológico',
            type: FieldType.date,
          },
          {
            property: 'WomanHealthSuspectedPregnancyWeekQuantity',
            value:
              personCompleteData?.healthSituation
                .WomanHealthSuspectedPregnancyWeekQuantity,
            label:
              'Saúde da Mulher - Há suspeita de gravidez? Quantas semanas?',
            type: FieldType.number,
          },
          {
            property: 'WomanHealthUseSomeContraceptiveMethod',
            value:
              personCompleteData?.healthSituation
                .WomanHealthUseSomeContraceptiveMethod,
            label: 'Saúde da Mulher - Usa algum método contraceptivo?',
            type: FieldType.boolean,
          },
          {
            property: 'UseCondom',
            value: personCompleteData?.healthSituation.UseCondom,
            label: 'Saúde da pessoa - Usa camisinha frequentemente?',
            type: FieldType.boolean,
          },
          {
            property: 'Observation',
            value: personCompleteData?.healthSituation.Comment,
            label: 'Observações',
            type: FieldType.input,
            inputConfig: { maxLength: 255 },
          },
        ],
      },
      // {
      //   label: 'Conferência',
      //   fields: [
      //     {
      //       property: 'Checked',
      //       value: person?.Checked,
      //       label: 'Conferido',
      //       type: FieldType.boolean,
      //     },
      //     {
      //       property: 'CheckedBy',
      //       value: person?.CheckedBy,
      //       label: 'Conferido por',
      //       type: FieldType.input,
      //     },
      //     {
      //       property: 'CheckedAt',
      //       value: person?.CheckedAt,
      //       label: 'Conferido em',
      //       type: FieldType.date,
      //     },
      //   ],
      // },
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

    console.log({ formData });

    Object.keys(body).forEach((k) => {
      if (isMoment(body[k])) {
        const momentDate: Moment = body[k] as Moment;
        body[k] = momentDate.format('YYYY-MM-DD');
      }
    });

    console.log({ body });

    // const saveMethod =
    //   personId !== null
    //     ? Api.put<Person>(`people/${personId}`, body)
    //     : Api.post<Person>('people', body);

    // const { status, data } = await saveMethod;

    // if (status !== 200) throw new Error();

    // return data;
    return new Promise<Person>(() => null);
  };
}

export default PeopleService;
