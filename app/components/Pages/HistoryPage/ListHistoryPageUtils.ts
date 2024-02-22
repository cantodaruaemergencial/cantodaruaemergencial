import { FormTypes } from '#/components/PersonModalCard/PersonModalCardUtils';
import { PastoralDeRuaServiceAttendance } from '#/types/PastoralServiceAttendance';

export const listHistoryData = (
  personAttendances: PastoralDeRuaServiceAttendance,
) => [
  {
    label: 'Telefonema',
    value: personAttendances.needs_call_details,
  },
  {
    label: 'Alimentação',
    value: personAttendances.needs_food,
  },
  {
    label: 'Saúde',
    value: personAttendances.needs_health_details,
  },
  {
    label: 'Outras demandas',
    value: personAttendances.needs_other_details,
  },
  {
    label: 'Trabalho',
    value: personAttendances.needs_work_details,
    type: FormTypes.bool,
  },
  {
    label: 'Conversa/Escuta',
    value: personAttendances.needs_conversation,
    type: FormTypes.bool,
  },
  {
    label: 'Documentos',
    value: personAttendances.needs_document,
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
    value: personAttendances.comment_pastoral_attendance,
  },
];
