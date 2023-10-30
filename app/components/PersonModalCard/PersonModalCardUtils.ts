import { PersonCompleteData } from '#/types/People';

export enum FormTypes {
  bool,
}

export const personModalCardData = (personCompleteData: PersonCompleteData) => [
  {
    title: 'Dados Pessoais',
    fields: [
      {
        label: 'Nome Social',
        value: personCompleteData.person.social_name,
      },
      {
        label: 'Nome do Pai',
        value: personCompleteData.person.father_name,
      },
      {
        label: 'Nacionalidade',
        value: personCompleteData.person.nationality,
      },
      {
        label: 'Ocupação',
        value: personCompleteData.person.occupation,
      },
      {
        label: 'E-mail',
        value: personCompleteData.person.email,
      },
      {
        label: 'Número de Telefone',
        value: personCompleteData.person.phone_number,
      },
      {
        label: 'Nº Certidão de Nascimento',
        value: personCompleteData.person.birth_document_number,
      },
      {
        label: 'Nº Certidão de Casamento',
        value: personCompleteData.person.wedding_document_number,
      },
      {
        label: 'Nº Registro Geral',
        value: personCompleteData.person.rg_document_number,
      },
      {
        label: 'Nº Certificado de Reservista',
        value: personCompleteData.person.reservist_document_number,
      },
      {
        label: 'Nº Título de Eleitor',
        value: personCompleteData.person.voter_registration_document_number,
      },
      {
        label: 'Nº Carteira Nacional de Habilitação',
        value: personCompleteData.person.cnh_document_number,
      },
      {
        label: 'Nº NIS',
        value: personCompleteData.person.nis_document_number,
      },
      {
        label: 'Nº Cadastro Único',
        value: personCompleteData.person.caduni_document_number,
      },
      {
        label: 'Possui registro GOV BR',
        value: personCompleteData.person.has_govbr_registration,
        type: FormTypes.bool,
      },
      {
        label: 'Estado Civil',
        value: personCompleteData.person.marital_status?.name,
      },
      {
        label: 'Auto Declaração de Raça',
        value: personCompleteData.person.self_declaration?.name,
      },
      {
        label: 'Gênero',
        value: personCompleteData.person.gender?.name,
      },
      {
        label: 'Orientação Sexual',
        value: personCompleteData.person.sexual_orientation?.name,
      },
      {
        label: 'Nº de Filhos',
        value: personCompleteData.person.child_quantity,
      },
      {
        label: 'Responsável pelos filhos',
        value: personCompleteData.person.child_care_person,
      },
      {
        label: 'Comentários',
        value: personCompleteData.person.comment_person,
      },
    ],
  },
  {
    title: 'Assistência Social',
    fields: [
      {
        label: 'É atendido por algum serviço da rede?',
        value:
          personCompleteData.socialAssistanceNetwork
            .is_attended_to_a_network_services,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por CREA?',
        value: personCompleteData.socialAssistanceNetwork.has_crea_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por CRAS?',
        value: personCompleteData.socialAssistanceNetwork.has_cras_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por Abrigo?',
        value: personCompleteData.socialAssistanceNetwork.has_shelter_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por conselho de direito?',
        value:
          personCompleteData.socialAssistanceNetwork
            .has_council_of_rights_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por saúde?',
        value: personCompleteData.socialAssistanceNetwork.has_health_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por educação?',
        value: personCompleteData.socialAssistanceNetwork.has_education_service,
        type: FormTypes.bool,
      },
      {
        label: 'Atendido por Pastoral de Rua?',
        value:
          personCompleteData.socialAssistanceNetwork
            .has_pastoral_povo_da_rua_service,
        type: FormTypes.bool,
      },
      {
        label: 'Comentários',
        value:
          personCompleteData.socialAssistanceNetwork
            .comment_social_assistance_network,
      },
    ],
  },
  {
    title: 'Benefício de reserva de vagas',
    fields: [
      {
        label: 'Possui algum benefício de vaga relacionado a cota racial?',
        value:
          personCompleteData.personVacancyReservationBenefit
            .has_vacancy_reservation_benefits_racial_quota,
        type: FormTypes.bool,
      },
      {
        label:
          'Possui algum benefício de vaga relacionado a egresso de sistema prisional?',
        value:
          personCompleteData.personVacancyReservationBenefit
            .has_vacancy_reservation_benefits_egress_prision_system,
        type: FormTypes.bool,
      },
      {
        label: 'Possui algum benefício de vaga relacionado a LGBT?',
        value:
          personCompleteData.personVacancyReservationBenefit
            .has_vacancy_reservation_benefits_lgbt,
        type: FormTypes.bool,
      },
      {
        label: 'Possui algum benefício de vaga relacionado a outros assuntos?',
        value:
          personCompleteData.personVacancyReservationBenefit
            .has_vacancy_reservation_benefits_others,
        type: FormTypes.bool,
      },
      {
        label: 'Possui algum benefício de vaga relacionado a PCD?',
        value:
          personCompleteData.personVacancyReservationBenefit
            .has_vacancy_reservation_benefits_pcd,
        type: FormTypes.bool,
      },
      {
        label: 'Comentários',
        value:
          personCompleteData.personVacancyReservationBenefit
            .details_person_vacancy_reservation_benefit,
      },
    ],
  },
  {
    title: 'Cultura',
    fields: [
      {
        label: 'Exercícios Praticados',
        value: personCompleteData.culture.exercises_practiced,
      },
      {
        label: 'Quantidade por semana',
        value: personCompleteData.culture.exercises_quantity_by_week,
      },
      {
        label: 'Conhece algum espaço cultural?',
        value: personCompleteData.culture.know_some_cultural_place,
        type: FormTypes.bool,
      },
      {
        label: 'Frequenta algum espaço cultural?',
        value: personCompleteData.culture.usually_go_to_some_culture_place,
        type: FormTypes.bool,
      },
      {
        label: 'Foi em algum espaço cultural nos últimos 12 meses',
        value:
          personCompleteData.culture.went_somewhere_place_last_twelve_months,
        type: FormTypes.bool,
      },
      {
        label: 'Tem hábito de ler?',
        value: personCompleteData.culture.has_reading_habit,
        type: FormTypes.bool,
      },
      {
        label: 'Tem hábito de ouvir música?',
        value: personCompleteData.culture.has_listening_music_habit,
        type: FormTypes.bool,
      },
      {
        label: 'Tem hábito de desenhar?',
        value: personCompleteData.culture.has_drawing_habit,
        type: FormTypes.bool,
      },
      {
        label: 'Tem outros hábitos?',
        value: personCompleteData.culture.other_habit,
      },
    ],
  },
  {
    title: 'Educação',
    fields: [
      {
        label: 'Está atualmente estudando?',
        value: personCompleteData.education.is_currently_studying,
        type: FormTypes.bool,
      },
      {
        label: 'Escolaridade',
        value: personCompleteData.education.study_degree?.name,
      },
      {
        label: 'Deseja voltar a estudar?',
        value: personCompleteData.education.is_interested_returning_study,
        type: FormTypes.bool,
      },
      {
        label: 'Possui algum curso, além da escola regular?',
        value: personCompleteData.education.has_extra_course,
        type: FormTypes.bool,
      },
      {
        label: 'Está interessada(o) em fazer algum curso?',
        value: personCompleteData.education.is_interested_doing_some_course,
        type: FormTypes.bool,
      },
      {
        label: 'Cursos de interesse',
        value: personCompleteData.education.desired_extra_course,
      },
    ],
  },
  {
    title: 'Infraestrutura',
    fields: [
      {
        label: 'Tem acesso diário a água potável?',
        value: personCompleteData.infrastructure.has_access_to_clean_water,
        type: FormTypes.bool,
      },
      {
        label: 'Tem acesso diário a sanitário adequado?',
        value: personCompleteData.infrastructure.has_access_to_adequate_toilets,
        type: FormTypes.bool,
      },
      {
        label: 'Tem acesso diário a uma cama?',
        value: personCompleteData.infrastructure.has_access_to_a_bed,
        type: FormTypes.bool,
      },
      {
        label: 'Tem acesso diário a um lugar seguro?',
        value: personCompleteData.infrastructure.has_access_to_safety_spot,
        type: FormTypes.bool,
      },
      {
        label: 'O lugar de estadia tem estrutura adequada?',
        value:
          personCompleteData.infrastructure
            .place_of_stay_has_adequate_structure,
        type: FormTypes.bool,
      },
      {
        label: 'O lugar de estadia é próximo de serviços básicos?',
        value:
          personCompleteData.infrastructure
            .place_of_stay_has_proximity_to_basic_services,
        type: FormTypes.bool,
      },
      {
        label: 'O lugar de estadia tem condição sonora adequada?',
        value:
          personCompleteData.infrastructure
            .place_of_stay_has_adequate_sound_condition,
        type: FormTypes.bool,
      },
      {
        label: 'Possui alguma mobília?',
        value: personCompleteData.infrastructure.has_any_furniture,
        type: FormTypes.bool,
      },
      {
        label: 'Comentários',
        value: personCompleteData.infrastructure.comment_infrastructure,
      },
    ],
  },
  {
    title: 'Referências Familiares',
    fields: [
      {
        label:
          'Quem são as pessoas do núcleo familiar? Descreva nome, parentesco e escolaridade',
        value: personCompleteData.familyReferences.description,
      },
      {
        label: 'Comentários',
        value: personCompleteData.familyReferences.comment_family_references,
      },
    ],
  },
  {
    title: 'Saúde',
    fields: [
      {
        label: 'Autoavaliação da saúde',
        value: personCompleteData.healthSituation.self_health_evaluation,
      },
      {
        label: 'Data da última avaliação médica',
        value: personCompleteData.healthSituation.date_last_medical_appointment,
      },
      {
        label: 'Data da última avaliação com dentista',
        value: personCompleteData.healthSituation.date_last_medical_dentist,
      },
      {
        label: 'Faz uso contínuo de medicação?',
        value: personCompleteData.healthSituation.use_medication_often,
        type: FormTypes.bool,
      },
      {
        label: 'Detalhes medicação contínua',
        value: personCompleteData.healthSituation.medication_details,
      },
      {
        label: 'Foi internado nos últimos 12 meses?',
        value:
          personCompleteData.healthSituation
            .was_hospitalized_last_twelve_months,
        type: FormTypes.bool,
      },
      {
        label: 'Motivo da internação',
        value: personCompleteData.healthSituation.hospitalized_reason,
      },
      {
        label: 'Tempo internado (Em meses)',
        value: personCompleteData.healthSituation.time_hospitalized_days,
      },
      {
        label: 'Já fez alguma cirurgia? Se sim, quais?',
        value: personCompleteData.healthSituation.did_any_surgery,
        type: FormTypes.bool,
      },
      {
        label: 'Possui cartão de vacinação?',
        value: personCompleteData.healthSituation.has_vaccination_card,
        type: FormTypes.bool,
      },
      {
        label: 'Vacinado contra COVID19',
        value:
          personCompleteData.healthSituation.is_updated_vaccination_covid19,
        type: FormTypes.bool,
      },
      {
        label: 'Vacinado contra Hepatite',
        value:
          personCompleteData.healthSituation.is_updated_vaccination_hepatite,
        type: FormTypes.bool,
      },
      {
        label: 'Vacinado contra Tetano',
        value: personCompleteData.healthSituation.is_updated_vaccination_tetano,
        type: FormTypes.bool,
      },
      {
        label: 'Vacinado contra Influenza',
        value:
          personCompleteData.healthSituation.is_updated_vaccination_influenza,
        type: FormTypes.bool,
      },
      {
        label: 'Vacinado contra Febre Amarela',
        value:
          personCompleteData.healthSituation
            .is_updated_vaccination_febre_amarela,
        type: FormTypes.bool,
      },
      {
        label:
          'Possui alguma questão (ou queixa) sobre sua saúde física ou mental?',
        value:
          personCompleteData.healthSituation
            .questions_regarding_physical_or_mental_health,
      },
      {
        label: 'Faz algum acompanhamento? Se sim, qual?',
        value: personCompleteData.healthSituation.do_some_follow_up,
      },
      {
        label: 'Usa alcool ou outras drogas? Se sim, quais?',
        value: personCompleteData.healthSituation.use_alcohol_or_other_drugs,
      },
      {
        label: 'Frequência de uso das drogas',
        value: personCompleteData.healthSituation.drugs_frequency?.name,
      },
      {
        label: 'Já foi internado em uma comunidade terapêutica? Se sim, quais?',
        value:
          personCompleteData.healthSituation
            .has_ever_been_admitted_to_therapeutic_community,
      },
      {
        label: 'Necessita de tratamento dental?',
        value: personCompleteData.healthSituation.need_dental_care,
        type: FormTypes.bool,
      },
      {
        label: 'Descreva o tratamento dental necessário',
        value: personCompleteData.healthSituation.describe_dental_care,
      },
      {
        label: 'Necessita de tratamento psicológico?',
        value: personCompleteData.healthSituation.need_psychological_care,
        type: FormTypes.bool,
      },
      {
        label: 'Descreva o tratamento psicológico necessário',
        value: personCompleteData.healthSituation.describe_psychological_care,
      },
      {
        label: 'Necessita de tratamento psiquiátrico?',
        value: personCompleteData.healthSituation.need_psychiatric_care,
        type: FormTypes.bool,
      },
      {
        label: 'Descreva o tratamento psiquiátrico necessário',
        value: personCompleteData.healthSituation.describe_psychiatric_care,
      },
      {
        label: 'Possui alguma deficiência? Descreva',
        value: personCompleteData.healthSituation.has_any_disabilities,
      },
      {
        label: 'Precisa de algum equipamento especial? Descreva',
        value:
          personCompleteData.healthSituation.describe_need_special_equipment,
      },
      {
        label: 'Possui hipertensão?',
        value:
          personCompleteData.healthSituation.has_any_comorbidities_hipertensao,
        type: FormTypes.bool,
      },
      {
        label: 'Possui diabetes?',
        value:
          personCompleteData.healthSituation.has_any_comorbidities_diabetes,
        type: FormTypes.bool,
      },
      {
        label: 'Possui problema cardiovascular?',
        value:
          personCompleteData.healthSituation
            .has_any_comorbidities_cardiovascular_problem,
        type: FormTypes.bool,
      },
      {
        label: 'Possui asma?',
        value: personCompleteData.healthSituation.has_any_comorbidities_asma,
        type: FormTypes.bool,
      },
      {
        label: 'Possui câncer?',
        value: personCompleteData.healthSituation.has_any_comorbidities_cancer,
        type: FormTypes.bool,
      },
      {
        label: 'Não possui comorbidade',
        value: personCompleteData.healthSituation.has_any_comorbidities_none,
        type: FormTypes.bool,
      },
      {
        label: 'Outra comorbidade',
        value: personCompleteData.healthSituation.other_specific_care,
      },
      {
        label: 'Saúde do Homem - Data do último exame de próstata',
        value:
          personCompleteData.healthSituation.man_health_last_prostate_exam_date,
      },
      {
        label: 'Saúde do Homem - Data do último exame de teste rápido',
        value: personCompleteData.healthSituation.man_health_last_ist_exam_date,
      },
      {
        label: 'Saúde do Mulher - Data do último exame preventivo',
        value:
          personCompleteData.healthSituation
            .woman_health_last_preventive_exam_date,
      },
      {
        label: 'Saúde do Mulher - Data do último exame de mamografia',
        value:
          personCompleteData.healthSituation
            .woman_health_last_mammography_exam_date,
      },
      {
        label: 'Saúde do Mulher - Data do última consulta ginecológica',
        value:
          personCompleteData.healthSituation
            .woman_health_last_gynecological_consultation_exam_date,
      },
      {
        label: 'Saúde do Mulher - Há suspeita de gravidez? Quantas semanas?',
        value:
          personCompleteData.healthSituation
            .woman_health_suspected_pregnancy_week_quantity,
      },
      {
        label: 'Saúde do Mulher - Usa algum método contraceptivo?',
        value:
          personCompleteData.healthSituation
            .woman_health_use_some_contraceptive_method,
        type: FormTypes.bool,
      },
      {
        label: 'Saúde da pessoa - Usa preservativo frequentemente?',
        value: personCompleteData.healthSituation.use_condom,
        type: FormTypes.bool,
      },
      {
        label: 'Comentários',
        value: personCompleteData.healthSituation.comment_health_situation,
      },
    ],
  },
  {
    title: 'Segurança',
    fields: [
      {
        label:
          'Foi vítima de crimes contra a propridade (Últimos 3 meses)? Se sim, quantas vezes?',
        value:
          personCompleteData.safeties
            .quantity_victim_of_crimes_against_property_last_three_months,
      },
      {
        label:
          'Foi vítima de crimes contra a pessoa (Últimos 3 meses)? Se sim, quantas vezes?',
        value:
          personCompleteData.safeties
            .quantity_victim_of_crimes_against_person_last_three_months,
      },
      {
        label:
          'Foi vítima de crimes de violência institucional (Últimos 3 meses)? Se sim, quantas vezes?',
        value:
          personCompleteData.safeties
            .quantity_victim_of_institutional_violence_last_three_months,
      },
      {
        label: 'Comentários',
        value: personCompleteData.safeties.comment_safety,
      },
    ],
  },
  {
    title: 'Situação Judicial',
    fields: [
      {
        label: 'Já passou pelo sistema socioeducativo?',
        value:
          personCompleteData.judicialSituation
            .has_already_been_through_the_socioeducational_system,
        type: FormTypes.bool,
      },
      {
        label: 'Já passou pelo sistema prisional?',
        value:
          personCompleteData.judicialSituation
            .has_already_been_through_the_prision_system,
        type: FormTypes.bool,
      },
      {
        label: 'Possui algum processo judicial?',
        value: personCompleteData.judicialSituation.has_an_active_lawsuit,
        type: FormTypes.bool,
      },
      {
        label: 'Possui mandado de execução em aberto?',
        value:
          personCompleteData.judicialSituation
            .has_outstanding_writ_of_execution,
        type: FormTypes.bool,
      },
      {
        label: 'Usa tornozeleira eletrônica?',
        value: personCompleteData.judicialSituation.wear_anklet,
        type: FormTypes.bool,
      },
      {
        label: 'Está sendo acompanhado por defensor?',
        value:
          personCompleteData.judicialSituation.is_accompanied_by_a_defender,
        type: FormTypes.bool,
      },
      {
        label: 'Este acompanhamento está sendo suficiente?',
        value: personCompleteData.judicialSituation.is_this_follow_up_enough,
        type: FormTypes.bool,
      },
      {
        label: 'Comentários',
        value: personCompleteData.judicialSituation.comment_judicial_situation,
      },
    ],
  },
  {
    title: 'Trabalho e Renda',
    fields: [
      {
        label: 'Já possui um trabalho remunerado?',
        value: personCompleteData.workAndIncomes.already_has_paid_work,
        type: FormTypes.bool,
      },
      {
        label: 'Trabalhos que já possuiu',
        value: personCompleteData.workAndIncomes.describe_past_paid_work,
      },
      {
        label: 'Tipo de trabalho atualmente',
        value: personCompleteData.workAndIncomes.work_type?.name,
      },
      {
        label: 'Participa de algum projeto de geração de renda?',
        value:
          personCompleteData.workAndIncomes
            .participate_in_any_income_generation_projects,
        type: FormTypes.bool,
      },
      {
        label: 'O que está sendo feito para sair dessa situação?',
        value:
          personCompleteData.workAndIncomes
            .what_is_being_done_to_get_out_of_this_situation,
      },
      {
        label: 'Benefício de aposentadoria',
        value: personCompleteData.workAndIncomes.retirement_benefit_value,
      },
      {
        label: 'Benefício de Prestação Continuada',
        value:
          personCompleteData.workAndIncomes.continuing_provision_benefit_value,
      },
      {
        label: 'Benefício Auxílio Doença',
        value: personCompleteData.workAndIncomes.sick_pay_benefit_value,
      },
      {
        label: 'Benefício Bolsa Família',
        value: personCompleteData.workAndIncomes.bolsa_familia_benefit_value,
      },
      {
        label: 'Benefício Auxílio Brasil',
        value:
          personCompleteData.workAndIncomes
            .brazil_financial_assistance_benefit_value,
      },
      {
        label: 'Outro benefício',
        value: personCompleteData.workAndIncomes.other_benefit_value,
      },
      {
        label: 'Renda familiar média mensal',
        value:
          personCompleteData.workAndIncomes.family_average_monthly_income_value,
      },
      {
        label: 'Em qual categoria já trabalhou?',
        value: personCompleteData.workAndIncomes.past_work_category?.name,
      },
      {
        label: 'Em qual setor já trabalhou?',
        value: personCompleteData.workAndIncomes.past_work_sector?.name,
      },
      {
        label: 'Comentários',
        value: personCompleteData.workAndIncomes.comment_work_and_income,
      },
    ],
  },
  {
    title: 'Trajetória de Rua',
    fields: [
      {
        label: 'Atualmente está em situação de rua?',
        value: personCompleteData.streetPaths.is_currently_homeless,
        type: FormTypes.bool,
      },
      {
        label: 'Há quanto tempo está em situação de rua?',
        value: personCompleteData.streetPaths.time_homeless,
      },
      {
        label: 'Motivo de estar em situação de rua',
        value: personCompleteData.streetPaths.homeless_reason,
      },
      {
        label:
          'Teve algum vínculo familiar interrompido? Se sim, há quanto tempo? (Em anos)',
        value:
          personCompleteData.streetPaths
            .had_any_family_ties_interrupted_quantity,
      },
      {
        label: 'Já esteve em um abrigo? Se sim, por quantos meses?',
        value:
          personCompleteData.streetPaths
            .already_been_in_shelter_quantity_months,
      },
      {
        label: 'Já esteve em uma casa de passagem? Se sim, por quantos meses?',
        value:
          personCompleteData.streetPaths.already_been_in_hostel_quantity_months,
      },
      {
        label: 'Há quanto tempo mora em Belo Horizonte? (Em meses)',
        value: personCompleteData.streetPaths.time_lived_in_bh_months,
      },
      {
        label: 'Já viveu em situação de rua em outra cidade? Se sim, quais?',
        value: personCompleteData.streetPaths.lived_on_streets_in_another_city,
      },
      {
        label:
          'Algum membro da família está ou esteve em situação de rua? Se sim, quem?',
        value:
          personCompleteData.streetPaths.any_family_member_have_been_homeless,
      },
      {
        label: 'O motivo de estar em situação de rua é desemprego?',
        value:
          personCompleteData.streetPaths.reason_past_street_path_unemployment,
        type: FormTypes.bool,
      },
      {
        label: 'O motivo de estar em situação de rua é problemas familiares?',
        value:
          personCompleteData.streetPaths
            .reason_past_street_path_family_problems,
        type: FormTypes.bool,
      },
      {
        label: 'O motivo de estar em situação de rua é drogas?',
        value: personCompleteData.streetPaths.reason_past_street_path_drugs,
        type: FormTypes.bool,
      },
      {
        label: 'Há outros motivos por estar em situação de rua? Se sim, quais?',
        value: personCompleteData.streetPaths.reason_past_street_path_comment,
      },
      {
        label: 'Já morou na rua antes? Quanto tempo? Em meses',
        value: personCompleteData.streetPaths.reason_past_street_path_comment,
      },
      {
        label: 'Comentários',
        value: personCompleteData.streetPaths.comment_street_path,
      },
    ],
  },
];
