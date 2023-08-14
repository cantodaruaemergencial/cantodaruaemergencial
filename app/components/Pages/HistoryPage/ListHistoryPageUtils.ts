import { FormTypes } from '#/components/PersonModalCard/PersonModalCardUtils';
import { PastoralDeRuaServiceAttendance } from '#/types/PastoralServiceAttendance';

export const listHistoryData = (
  personAttendances: PastoralDeRuaServiceAttendance,
) => [
  {
    label: 'Telefonema',
    value: personAttendances.describe_needs_call,
  },
  {
    label: 'Alimentação',
    value: personAttendances.describe_needs_food,
  },
  {
    label: 'Saúde',
    value: personAttendances.describe_needs_health,
  },
  {
    label: 'Outras demandas',
    value: personAttendances.describe_needs_others,
  },
  {
    label: 'Trabalho',
    value: personAttendances.describe_needs_work,
    type: FormTypes.bool,
  },
  {
    label: 'Conversa/Escuta',
    value: personAttendances.needs_conversation,
    type: FormTypes.bool,
  },
  {
    label: 'Documentos',
    value: personAttendances.needs_documents,
    type: FormTypes.bool,
  },
  {
    label: 'Moradia',
    value: personAttendances.needs_house,
    type: FormTypes.bool,
  },
  {
    label: 'Cuidados de Higiene',
    value: personAttendances.needs_hygiene_care,
    type: FormTypes.bool,
  },
  {
    label: 'Abrigo/Albergue',
    value: personAttendances.needs_shelter,
    type: FormTypes.bool,
  },
  {
    label: 'República',
    value: personAttendances.needs_temporary_home,
    type: FormTypes.bool,
  },
  {
    label: 'Observações',
    value: personAttendances.comment,
  },
];
