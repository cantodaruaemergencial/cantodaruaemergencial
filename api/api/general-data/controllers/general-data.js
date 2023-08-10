const query = async (query) => {
	const knex = strapi.connections.default;
	return await knex.raw(query);
};

const getQuery = async (q, isArray = true) => {
	const r = await query(q);
	return isArray ? r[0] : r[0][0];
};

const NULL_DATE = "1000-01-01";

module.exports = {
	findByPerson: async (ctx) => {
		const personId = ctx.params.personid;
		if (isNaN(Number(personId))) throw Error("Internal server error");

		const cultureByUser = await getQuery(
			`select * from cultures where person = ${personId}`
		);
		const educationByUser = await getQuery(
			`select * from educations where person = ${personId}`
		);
		const familyReferenceByUser = await getQuery(
			`select * from family_references where person = ${personId}`
		);
		const healthSituationByUser = await getQuery(
			`select * from health_situations where person = ${personId}`
		);
		const infrastrutureByUser = await getQuery(
			`select * from infrastructures where person = ${personId}`
		);
		const judicialSituationsByUser = await getQuery(
			`select * from judicial_situations where person = ${personId}`
		);
		const person = await getQuery(
			`select * from person where id = ${personId}`
		);
		const personVacancyReservationBenefitByUser = await getQuery(
			`select * from person_vacancy_reservation_benefits where person = ${personId}`
		);
		const safetiesByUser = await getQuery(
			`select * from safeties where person = ${personId}`
		);
		const socialAssistanceNetworkByUser = await getQuery(
			`select * from social_assistance_networks where person = ${personId}`
		);
		const streetPathsByUser = await getQuery(
			`select * from street_paths where person = ${personId}`
		);
		const workAndIncomesByUser = await getQuery(
			`select * from work_and_incomes where person = ${personId}`
		);

		return ctx.send({
			culture: cultureByUser,
			education: educationByUser,
			familyReferences: familyReferenceByUser,
			healthSituation: healthSituationByUser,
			infrastructure: infrastrutureByUser,
			judicialSituation: judicialSituationsByUser,
			person,
			personVacancyReservationBenefit: personVacancyReservationBenefitByUser,
			safeties: safetiesByUser,
			socialAssistanceNetwork: socialAssistanceNetworkByUser,
			streetPaths: streetPathsByUser,
			workAndIncomes: workAndIncomesByUser,
		});
	},

	createByPerson: async (ctx) => {
		const personId = ctx.params.personid;
		const body = ctx.request.body;

		if (isNaN(Number(personId)) || !body) throw Error("Internal server error");

		const {
			culture,
			education,
			familyReferences,
			healthSituation,
			infrastruture,
			judicialSituation,
			personVacancyReservationBenefit,
			safeties,
			socialAssistanceNetwork,
			streetPaths,
			workAndIncomes,
		} = body;

		if (culture && Object.keys(culture).some((key) => key)) {
			await getQuery(
				`insert into cultures 
					(
						exercises_practiced, 
						exercises_quantity_by_week, 
						know_some_cultural_place, 
						usually_go_to_some_culture_place, 
						went_somewhere_place_last_twelve_months,
						has_reading_habit,
						has_listening_music_habit,
						has_drawing_habit,
						other_habit,
						user,
						person
					) 
					values (
						'${culture.exercises_practiced ?? ""}', 
						${culture.exercises_quantity_by_week ?? ""}, 
						${culture.know_some_cultural_place ?? ""}, 
						${culture.usually_go_to_some_culture_place ?? ""}, 
						${culture.went_somewhere_place_last_twelve_months ?? ""},
						${culture.has_reading_habit ?? ""},
						${culture.has_listening_music_habit ?? ""},
						${culture.has_drawing_habit ?? ""},
						'${culture.other_habit ?? ""}',
						${culture.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (education && Object.keys(education).some((key) => key)) {
			await getQuery(
				`insert into educations 
					(
						is_currently_studying,
						study_degree,
						is_interested_returning_study,
						has_extra_course,
						is_interested_doing_some_course,
						desired_extra_course,
						user,
						person
					) 
					values (
						${education.is_currently_studying ?? ""},
						${education.study_degree ?? ""},
						${education.is_interested_returning_study ?? ""},
						${education.has_extra_course ?? ""},
						${education.is_interested_doing_some_course ?? ""},
						'${education.desired_extra_course ?? ""}',
						${education.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (familyReferences && Object.keys(familyReferences).some((key) => key)) {
			await getQuery(
				`insert into family_references 
					(
						description,
						comment_family_references,
						user,
						person
					) 
					values (
						'${familyReferences.description ?? ""}',
						'${familyReferences.comment_family_references ?? ""}',
						${familyReferences.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (healthSituation && Object.keys(healthSituation).some((key) => key)) {
			await getQuery(
				`insert into health_situations 
					(
						self_health_evaluation,
						date_last_medical_appointment,
						date_last_medical_dentist,
						use_medication_often,
						medication_details,
						was_hospitalized_last_twelve_months,
						hospitalized_reason,
						time_hospitalized_days,
						did_any_surgery,
						has_vaccination_card,
						is_updated_vaccination_covid19,
						is_updated_vaccination_hepatite,
						is_updated_vaccination_tetano,
						is_updated_vaccination_influenza,
						is_updated_vaccination_febre_amarela,
						questions_regarding_physical_or_mental_health,
						do_some_follow_up,
						use_alcohol_or_other_drugs,
						drugs_frequency,
						has_ever_been_admitted_to_therapeutic_community,
						need_dental_care,
						describe_dental_care,
						need_psychological_care,
						describe_psychological_care,
						need_psychiatric_care,
						describe_psychiatric_care,
						other_specific_care,
						has_any_disabilities,
						describe_need_special_equipment,
						has_any_comorbidities_hipertensao,
						has_any_comorbidities_diabetes,
						has_any_comorbidities_cardiovascular_problem,
						has_any_comorbidities_depression,
						has_any_comorbidities_asma,
						has_any_comorbidities_cancer,
						has_any_comorbidities_none,
						has_any_comorbidities_other,
						man_health_last_prostate_exam_date,
						man_health_last_ist_exam_date,
						woman_health_last_preventive_exam_date,
						woman_health_last_mammography_exam_date,
						woman_health_last_gynecological_consultation_exam_date,
						woman_health_suspected_pregnancy_week_quantity,
						woman_health_use_some_contraceptive_method,
						use_condom,
						comment_health_situation,
						user,
						person
					) 
					values (
						'${healthSituation.self_health_evaluation ?? ""}',
						'${healthSituation.date_last_medical_appointment ?? NULL_DATE}',
						'${healthSituation.date_last_medical_dentist ?? NULL_DATE}',
						${healthSituation.use_medication_often ?? ""},
						'${healthSituation.medication_details ?? ""}',
						${healthSituation.was_hospitalized_last_twelve_months ?? ""},
						'${healthSituation.hospitalized_reason ?? ""}',
						${healthSituation.time_hospitalized_days ?? ""},
						'${healthSituation.did_any_surgery ?? ""}',
						${healthSituation.has_vaccination_card ?? ""},
						${healthSituation.is_updated_vaccination_covid19 ?? ""},
						${healthSituation.is_updated_vaccination_hepatite ?? ""},
						${healthSituation.is_updated_vaccination_tetano ?? ""},
						${healthSituation.is_updated_vaccination_influenza ?? ""},
						${healthSituation.is_updated_vaccination_febre_amarela ?? ""},
						'${healthSituation.questions_regarding_physical_or_mental_health ?? ""}',
						'${healthSituation.do_some_follow_up ?? ""}',
						'${healthSituation.use_alcohol_or_other_drugs ?? ""}',
						${healthSituation.drugs_frequency ?? ""},
						'${healthSituation.has_ever_been_admitted_to_therapeutic_community ?? ""}',
						${healthSituation.need_dental_care ?? ""},
						'${healthSituation.describe_dental_care ?? ""}',
						${healthSituation.need_psychological_care ?? ""},
						'${healthSituation.describe_psychological_care ?? ""}',
						${healthSituation.need_psychiatric_care ?? ""},
						'${healthSituation.describe_psychiatric_care ?? ""}',
						'${healthSituation.other_specific_care ?? ""}',
						'${healthSituation.has_any_disabilities ?? ""}',
						'${healthSituation.describe_need_special_equipment ?? ""}',
						${healthSituation.has_any_comorbidities_hipertensao ?? ""},
						${healthSituation.has_any_comorbidities_diabetes ?? ""},
						${healthSituation.has_any_comorbidities_cardiovascular_problem ?? ""},
						${healthSituation.has_any_comorbidities_depression ?? ""},
						${healthSituation.has_any_comorbidities_asma ?? ""},
						${healthSituation.has_any_comorbidities_cancer ?? ""},
						${healthSituation.has_any_comorbidities_none ?? ""},
						'${healthSituation.has_any_comorbidities_other ?? ""}',
						'${healthSituation.man_health_last_prostate_exam_date ?? NULL_DATE}',
						'${healthSituation.man_health_last_ist_exam_date ?? NULL_DATE}',
						'${healthSituation.woman_health_last_preventive_exam_date ?? NULL_DATE}',
						'${healthSituation.woman_health_last_mammography_exam_date ?? NULL_DATE}',
						'${
							healthSituation.woman_health_last_gynecological_consultation_exam_date ??
							NULL_DATE
						}',
						${healthSituation.woman_health_suspected_pregnancy_week_quantity ?? ""},
						${healthSituation.woman_health_use_some_contraceptive_method ?? ""},
						${healthSituation.use_condom ?? ""},
						'${healthSituation.comment_health_situation ?? ""}',
						${healthSituation.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (infrastruture && Object.keys(infrastruture).some((key) => key)) {
			await getQuery(
				`insert into infrastructures 
					(
						has_access_to_clean_water,
						has_access_to_adequate_toilets,
						has_access_to_a_bed,
						has_access_to_safety_spot,
						place_of_stay_has_adequate_hygiene,
						place_of_stay_has_adequate_structure,
						place_of_stay_has_proximity_to_basic_services,
						place_of_stay_has_adequate_sound_condition,
						has_any_furniture,
						comment_infrastructure,
						user,
						person
					) 
					values (
						${infrastruture.has_access_to_clean_water ?? ""},
						${infrastruture.has_access_to_adequate_toilets ?? ""},
						${infrastruture.has_access_to_a_bed ?? ""},
						${infrastruture.has_access_to_safety_spot ?? ""},
						${infrastruture.place_of_stay_has_adequate_hygiene ?? ""},
						${infrastruture.place_of_stay_has_adequate_structure ?? ""},
						${infrastruture.place_of_stay_has_proximity_to_basic_services ?? ""},
						${infrastruture.place_of_stay_has_adequate_sound_condition ?? ""},
						${infrastruture.has_any_furniture ?? ""},
						'${infrastruture.comment_infrastructure ?? ""}',
						${infrastruture.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (
			judicialSituation &&
			Object.keys(judicialSituation).some((key) => key)
		) {
			await getQuery(
				`insert into judicial_situations 
					(
						has_already_been_through_the_socioeducational_system,
						has_already_been_through_the_prision_system,
						has_an_active_lawsuit,
						has_outstanding_writ_of_execution,
						wear_anklet,
						is_accompanied_by_a_defender,
						is_this_follow_up_enough,
						comment_judicial_situation,
						user,
						person
					) 
					values (
						${judicialSituation.has_already_been_through_the_socioeducational_system ?? ""},
						${judicialSituation.has_already_been_through_the_prision_system ?? ""},
						${judicialSituation.has_an_active_lawsuit ?? ""},
						${judicialSituation.has_outstanding_writ_of_execution ?? ""},
						${judicialSituation.wear_anklet ?? ""},
						${judicialSituation.is_accompanied_by_a_defender ?? ""},
						${judicialSituation.is_this_follow_up_enough ?? ""},
						'${judicialSituation.comment_judicial_situation ?? ""}',
						${judicialSituation.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (
			personVacancyReservationBenefit &&
			Object.keys(personVacancyReservationBenefit).some((key) => key)
		) {
			await getQuery(
				`insert into person_vacancy_reservation_benefits 
					(
						vacancy_reservation_benefit,
						details_person_vacancy_reservation_benefit,
						user,
						person
					) 
					values (
						${personVacancyReservationBenefit.vacancy_reservation_benefit ?? ""},
						'${
							personVacancyReservationBenefit.details_person_vacancy_reservation_benefit ??
							""
						}',
						${personVacancyReservationBenefit.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (safeties && Object.keys(safeties).some((key) => key)) {
			await getQuery(
				`insert into safeties 
					(
						quantity_victim_of_crimes_against_property_last_three_months,
						quantity_victim_of_crimes_against_person_last_three_months,
						quantity_victim_of_institutional_violence_last_three_months,
						  comment_safety,	
						user,
						person
					) 
					values (
						${safeties.quantity_victim_of_crimes_against_property_last_three_months ?? ""},
						${safeties.quantity_victim_of_crimes_against_person_last_three_months ?? ""},
						${safeties.quantity_victim_of_institutional_violence_last_three_months ?? ""},
						  '${safeties.comment_safety ?? ""}',	
						${safeties.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (
			socialAssistanceNetwork &&
			Object.keys(socialAssistanceNetwork).some((key) => key)
		) {
			await getQuery(
				`insert into social_assistance_networks 
					(
						is_attended_to_a_network_services,
						has_crea_service,
						has_cras_service,
						has_shelter_service,
						has_council_of_rights_service,
						has_health_service,
						has_education_service,
						has_pastoral_povo_da_rua_service,
						comment_social_assistance_network,
						user,
						person
					) 
					values (
						${socialAssistanceNetwork.is_attended_to_a_network_services ?? ""},
						${socialAssistanceNetwork.has_crea_service ?? ""},
						${socialAssistanceNetwork.has_cras_service ?? ""},
						${socialAssistanceNetwork.has_shelter_service ?? ""},
						${socialAssistanceNetwork.has_council_of_rights_service ?? ""},
						${socialAssistanceNetwork.has_health_service ?? ""},
						${socialAssistanceNetwork.has_education_service ?? ""},
						${socialAssistanceNetwork.has_pastoral_povo_da_rua_service ?? ""},
						'${socialAssistanceNetwork.comment_social_assistance_network ?? ""}',
						${socialAssistanceNetwork.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (streetPaths && Object.keys(streetPaths).some((key) => key)) {
			await getQuery(
				`insert into street_paths 
					(
						is_currently_homeless,
						time_homeless,
						homeless_reason,
						had_any_family_ties_interrupted_quantity,
						already_been_in_shelter_quantity_months,
						already_been_in_hostel_quantity_months,
						time_lived_in_bh_months,
						lived_on_streets_in_another_city,
						any_family_member_have_been_homeless,
						reason_past_street_path_unemployment,
						reason_past_street_path_family_problems,
						reason_past_street_path_drugs,
						reason_past_street_path_comment,
						time_past_street_path,
						comment_street_path,
						user,
						person
					) 
					values (
						${streetPaths.is_currently_homeless ?? ""},
						${streetPaths.time_homeless ?? ""},
						'${streetPaths.homeless_reason ?? ""}',
						${streetPaths.had_any_family_ties_interrupted_quantity ?? ""},
						${streetPaths.already_been_in_shelter_quantity_months ?? ""},
						${streetPaths.already_been_in_hostel_quantity_months ?? ""},
						${streetPaths.time_lived_in_bh_months ?? ""},
						'${streetPaths.lived_on_streets_in_another_city ?? ""}',
						'${streetPaths.any_family_member_have_been_homeless ?? ""}',
						${streetPaths.reason_past_street_path_unemployment ?? ""},
						${streetPaths.reason_past_street_path_family_problems ?? ""},
						${streetPaths.reason_past_street_path_drugs ?? ""},
						'${streetPaths.reason_past_street_path_comment ?? ""}',
						${streetPaths.time_past_street_path ?? ""},
						'${streetPaths.comment_street_path ?? ""}',
						${streetPaths.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		if (workAndIncomes && Object.keys(workAndIncomes).some((key) => key)) {
			await getQuery(
				`insert into work_and_incomes 
					(
						already_has_paid_work,
						describe_past_paid_work,
						work_type,
						participate_in_any_income_generation_projects,
						what_is_being_done_to_get_out_of_this_situation,
						retirement_benefit_value,
						continuing_provision_benefit_value,
						sick_pay_benefit_value,
						bolsa_familia_benefit_value,
						brazil_financial_assistance_benefit_value,
						other_benefit_value,
						family_average_monthly_income_value,
						past_work_category,
						past_work_sector,
						comment_work_and_income,
						user,
						person
					) 
					values (
						${workAndIncomes.already_has_paid_work ?? ""},
						'${workAndIncomes.describe_past_paid_work ?? ""}',
						${workAndIncomes.work_type ?? ""},
						${workAndIncomes.participate_in_any_income_generation_projects ?? ""},
						'${workAndIncomes.what_is_being_done_to_get_out_of_this_situation ?? ""}',
						${workAndIncomes.retirement_benefit_value ?? ""},
						${workAndIncomes.continuing_provision_benefit_value ?? ""},
						${workAndIncomes.sick_pay_benefit_value ?? ""},
						${workAndIncomes.bolsa_familia_benefit_value ?? ""},
						${workAndIncomes.brazil_financial_assistance_benefit_value ?? ""},
						${workAndIncomes.other_benefit_value ?? ""},
						${workAndIncomes.family_average_monthly_income_value ?? ""},
						${workAndIncomes.past_work_category ?? ""},
						${workAndIncomes.past_work_sector ?? ""},
						'${workAndIncomes.comment_work_and_income ?? ""}',
						${workAndIncomes.user ?? ""},
						${personId ?? ""}
					)`
			);
		}

		return ctx.send({ message: "Ok" });
	},

	updateByPerson: async (ctx) => {
		const personId = ctx.params.personid;
		const body = ctx.request.body;

		if (isNaN(Number(personId)) || !body) throw Error("Internal server error");

		const {
			culture,
			education,
			familyReferences,
			healthSituation,
			infrastruture,
			judicialSituation,
			personVacancyReservationBenefit,
			safeties,
			socialAssistanceNetwork,
			streetPaths,
			workAndIncomes,
		} = body;

		if (culture && Object.keys(culture).some((key) => key)) {
			await getQuery(
				`update cultures 
						set exercises_practiced = '${culture.exercises_practiced ?? ""}',
						exercises_quantity_by_week = ${culture.exercises_quantity_by_week ?? ""},
						know_some_cultural_place = ${culture.know_some_cultural_place ?? ""},
						usually_go_to_some_culture_place = ${
							culture.usually_go_to_some_culture_place ?? ""
						},
						went_somewhere_place_last_twelve_months = ${
							culture.went_somewhere_place_last_twelve_months ?? ""
						},
						has_reading_habit = ${culture.has_reading_habit ?? ""},
						has_listening_music_habit = ${culture.has_listening_music_habit ?? ""},
						has_drawing_habit = ${culture.has_drawing_habit ?? ""},
						other_habit = '${culture.other_habit ?? ""}',
						user = ${culture.user ?? ""}
					where person = ${personId}`
			);
		}

		if (education && Object.keys(education).some((key) => key)) {
			await getQuery(
				`update educations 
						set is_currently_studying = ${education.is_currently_studying ?? ""},
						study_degree = ${education.study_degree ?? ""},
						is_interested_returning_study = ${
							education.is_interested_returning_study ?? ""
						},
						has_extra_course = ${education.has_extra_course ?? ""},
						is_interested_doing_some_course = ${
							education.is_interested_doing_some_course ?? ""
						},
						desired_extra_course = '${education.desired_extra_course ?? ""}',
						user = ${education.user ?? ""}
					where person = ${personId}`
			);
		}

		if (familyReferences && Object.keys(familyReferences).some((key) => key)) {
			await getQuery(
				`update family_references 
						set description = '${familyReferences.description ?? ""}',
						comment_family_references = '${
							familyReferences.comment_family_references ?? ""
						}',
						user = ${familyReferences.user ?? ""}
					where person = ${personId}`
			);
		}

		if (healthSituation && Object.keys(healthSituation).some((key) => key)) {
			await getQuery(
				`update health_situations 
						set self_health_evaluation = '${healthSituation.self_health_evaluation ?? ""}',
						date_last_medical_appointment = '${
							healthSituation.date_last_medical_appointment ?? NULL_DATE
						}',
						date_last_medical_dentist = '${
							healthSituation.date_last_medical_dentist ?? NULL_DATE
						}',
						use_medication_often = ${healthSituation.use_medication_often ?? ""},
						medication_details = '${healthSituation.medication_details ?? ""}',
						was_hospitalized_last_twelve_months = ${
							healthSituation.was_hospitalized_last_twelve_months ?? ""
						},
						hospitalized_reason = '${healthSituation.hospitalized_reason ?? ""}',
						time_hospitalized_days = ${healthSituation.time_hospitalized_days ?? ""},
						did_any_surgery = '${healthSituation.did_any_surgery ?? ""}',
						has_vaccination_card = ${healthSituation.has_vaccination_card ?? ""},
						is_updated_vaccination_covid19 = ${
							healthSituation.is_updated_vaccination_covid19 ?? ""
						},
						is_updated_vaccination_hepatite = ${
							healthSituation.is_updated_vaccination_hepatite ?? ""
						},
						is_updated_vaccination_tetano = ${
							healthSituation.is_updated_vaccination_tetano ?? ""
						},
						is_updated_vaccination_influenza = ${
							healthSituation.is_updated_vaccination_influenza ?? ""
						},
						is_updated_vaccination_febre_amarela = ${
							healthSituation.is_updated_vaccination_febre_amarela ?? ""
						},
						questions_regarding_physical_or_mental_health = '${
							healthSituation.questions_regarding_physical_or_mental_health ??
							""
						}',
						do_some_follow_up = '${healthSituation.do_some_follow_up ?? ""}',
						use_alcohol_or_other_drugs = '${
							healthSituation.use_alcohol_or_other_drugs ?? ""
						}',
						drugs_frequency = ${healthSituation.drugs_frequency ?? ""},
						has_ever_been_admitted_to_therapeutic_community = '${
							healthSituation.has_ever_been_admitted_to_therapeutic_community ??
							""
						}',
						need_dental_care = ${healthSituation.need_dental_care ?? ""},
						describe_dental_care = '${healthSituation.describe_dental_care ?? ""}',
						need_psychological_care = ${healthSituation.need_psychological_care ?? ""},
						describe_psychological_care = '${
							healthSituation.describe_psychological_care ?? ""
						}',
						need_psychiatric_care = ${healthSituation.need_psychiatric_care ?? ""},
						describe_psychiatric_care = '${
							healthSituation.describe_psychiatric_care ?? ""
						}',
						other_specific_care = '${healthSituation.other_specific_care ?? ""}',
						has_any_disabilities = '${healthSituation.has_any_disabilities ?? ""}',
						describe_need_special_equipment = '${
							healthSituation.describe_need_special_equipment ?? ""
						}',
						has_any_comorbidities_hipertensao = ${
							healthSituation.has_any_comorbidities_hipertensao ?? ""
						},
						has_any_comorbidities_diabetes = ${
							healthSituation.has_any_comorbidities_diabetes ?? ""
						},
						has_any_comorbidities_cardiovascular_problem = ${
							healthSituation.has_any_comorbidities_cardiovascular_problem ?? ""
						},
						has_any_comorbidities_depression = ${
							healthSituation.has_any_comorbidities_depression ?? ""
						},
						has_any_comorbidities_asma = ${
							healthSituation.has_any_comorbidities_asma ?? ""
						},
						has_any_comorbidities_cancer = ${
							healthSituation.has_any_comorbidities_cancer ?? ""
						},
						has_any_comorbidities_none = ${
							healthSituation.has_any_comorbidities_none ?? ""
						},
						has_any_comorbidities_other = '${
							healthSituation.has_any_comorbidities_other ?? ""
						}',
						man_health_last_prostate_exam_date = '${
							healthSituation.man_health_last_prostate_exam_date ?? ""
						}',
						man_health_last_ist_exam_date = '${
							healthSituation.man_health_last_ist_exam_date ?? ""
						}',
						woman_health_last_preventive_exam_date = '${
							healthSituation.woman_health_last_preventive_exam_date ??
							NULL_DATE
						}',
						woman_health_last_mammography_exam_date = '${
							healthSituation.woman_health_last_mammography_exam_date ??
							NULL_DATE
						}',
						woman_health_last_gynecological_consultation_exam_date = '${
							healthSituation.woman_health_last_gynecological_consultation_exam_date ??
							NULL_DATE
						}',
						woman_health_suspected_pregnancy_week_quantity = ${
							healthSituation.woman_health_suspected_pregnancy_week_quantity ??
							NULL_DATE
						},
						woman_health_use_some_contraceptive_method = ${
							healthSituation.woman_health_use_some_contraceptive_method ?? ""
						},
						use_condom = ${healthSituation.use_condom ?? ""},
						comment_health_situation = '${healthSituation.comment_health_situation ?? ""}',
						user = ${healthSituation.user ?? ""}
					where person = ${personId}`
			);
		}

		if (
			judicialSituation &&
			Object.keys(judicialSituation).some((key) => key)
		) {
			await getQuery(
				`update judicial_situations
						set has_already_been_through_the_socioeducational_system = ${
							judicialSituation.has_already_been_through_the_socioeducational_system ??
							""
						},
						has_already_been_through_the_prision_system = ${
							judicialSituation.has_already_been_through_the_prision_system ??
							""
						},
						has_an_active_lawsuit = ${judicialSituation.has_an_active_lawsuit ?? ""},
						has_outstanding_writ_of_execution = ${
							judicialSituation.has_outstanding_writ_of_execution ?? ""
						},
						wear_anklet = ${judicialSituation.wear_anklet ?? ""},
						is_accompanied_by_a_defender = ${
							judicialSituation.is_accompanied_by_a_defender ?? ""
						},
						is_this_follow_up_enough = ${judicialSituation.is_this_follow_up_enough ?? ""},
						comment_judicial_situation = '${
							judicialSituation.comment_judicial_situation ?? ""
						}',
						user = ${judicialSituation.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (infrastruture && Object.keys(infrastruture).some((key) => key)) {
			await getQuery(
				`update infrastructures 
						set has_access_to_clean_water = ${
							infrastruture.has_access_to_clean_water ?? ""
						},
						has_access_to_adequate_toilets = ${
							infrastruture.has_access_to_adequate_toilets ?? ""
						},
						has_access_to_a_bed = ${infrastruture.has_access_to_a_bed ?? ""},
						has_access_to_safety_spot = ${infrastruture.has_access_to_safety_spot ?? ""},
						place_of_stay_has_adequate_hygiene = ${
							infrastruture.place_of_stay_has_adequate_hygiene ?? ""
						},
						place_of_stay_has_adequate_structure = ${
							infrastruture.place_of_stay_has_adequate_structure ?? ""
						},
						place_of_stay_has_proximity_to_basic_services = ${
							infrastruture.place_of_stay_has_proximity_to_basic_services ?? ""
						},
						place_of_stay_has_adequate_sound_condition = ${
							infrastruture.place_of_stay_has_adequate_sound_condition ?? ""
						},
						has_any_furniture = ${infrastruture.has_any_furniture ?? ""},
						comment_infrastructure = '${infrastruture.comment_infrastructure ?? ""}',
						user = ${infrastruture.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (
			personVacancyReservationBenefit &&
			Object.keys(personVacancyReservationBenefit).some((key) => key)
		) {
			await getQuery(
				`update person_vacancy_reservation_benefits 
						set vacancy_reservation_benefit = ${
							personVacancyReservationBenefit.vacancy_reservation_benefit ?? ""
						},
						details_person_vacancy_reservation_benefit = '${
							personVacancyReservationBenefit.details_person_vacancy_reservation_benefit ??
							""
						}',
						user = ${personVacancyReservationBenefit.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (safeties && Object.keys(safeties).some((key) => key)) {
			await getQuery(
				`update safeties 
						set quantity_victim_of_crimes_against_property_last_three_months = ${
							safeties.quantity_victim_of_crimes_against_property_last_three_months ??
							""
						},
						quantity_victim_of_crimes_against_person_last_three_months = ${
							safeties.quantity_victim_of_crimes_against_person_last_three_months ??
							""
						},
						quantity_victim_of_institutional_violence_last_three_months = ${
							safeties.quantity_victim_of_institutional_violence_last_three_months ??
							""
						},
						comment_safety = '${safeties.comment_safety ?? ""}',	
						user = ${safeties.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (
			socialAssistanceNetwork &&
			Object.keys(socialAssistanceNetwork).some((key) => key)
		) {
			await getQuery(
				`update social_assistance_networks 
						set is_attended_to_a_network_services = ${
							socialAssistanceNetwork.is_attended_to_a_network_services ?? ""
						},
						has_crea_service = ${socialAssistanceNetwork.has_crea_service ?? ""},
						has_cras_service = ${socialAssistanceNetwork.has_cras_service ?? ""},
						has_shelter_service = ${socialAssistanceNetwork.has_shelter_service ?? ""},
						has_council_of_rights_service = ${
							socialAssistanceNetwork.has_council_of_rights_service ?? ""
						},
						has_health_service = ${socialAssistanceNetwork.has_health_service ?? ""},
						has_education_service = ${socialAssistanceNetwork.has_education_service ?? ""},
						has_pastoral_povo_da_rua_service = ${
							socialAssistanceNetwork.has_pastoral_povo_da_rua_service ?? ""
						},
						comment_social_assistance_network = '${
							socialAssistanceNetwork.comment_social_assistance_network ?? ""
						}',
						user = ${socialAssistanceNetwork.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (streetPaths && Object.keys(streetPaths).some((key) => key)) {
			await getQuery(
				`update street_paths 
						set is_currently_homeless = ${streetPaths.is_currently_homeless ?? ""},
						time_homeless = ${streetPaths.time_homeless ?? ""},
						homeless_reason = '${streetPaths.homeless_reason ?? ""}',
						had_any_family_ties_interrupted_quantity = ${
							streetPaths.had_any_family_ties_interrupted_quantity ?? ""
						},
						already_been_in_shelter_quantity_months = ${
							streetPaths.already_been_in_shelter_quantity_months ?? ""
						},
						already_been_in_hostel_quantity_months = ${
							streetPaths.already_been_in_hostel_quantity_months ?? ""
						},
						time_lived_in_bh_months = ${streetPaths.time_lived_in_bh_months ?? ""},
						lived_on_streets_in_another_city = '${
							streetPaths.lived_on_streets_in_another_city ?? ""
						}',
						any_family_member_have_been_homeless = '${
							streetPaths.any_family_member_have_been_homeless ?? ""
						}',
						reason_past_street_path_unemployment = ${
							streetPaths.reason_past_street_path_unemployment ?? ""
						},
						reason_past_street_path_family_problems = ${
							streetPaths.reason_past_street_path_family_problems ?? ""
						},
						reason_past_street_path_drugs = ${
							streetPaths.reason_past_street_path_drugs ?? ""
						},
						reason_past_street_path_comment = '${
							streetPaths.reason_past_street_path_comment ?? ""
						}',
						time_past_street_path = ${streetPaths.time_past_street_path ?? ""},
						comment_street_path = '${streetPaths.comment_street_path ?? ""}',
						user = ${streetPaths.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		if (workAndIncomes && Object.keys(workAndIncomes).some((key) => key)) {
			await getQuery(
				`update work_and_incomes 
						set already_has_paid_work = ${workAndIncomes.already_has_paid_work ?? ""},
						describe_past_paid_work = '${workAndIncomes.describe_past_paid_work ?? ""}',
						work_type = ${workAndIncomes.work_type ?? ""},
						participate_in_any_income_generation_projects = ${
							workAndIncomes.participate_in_any_income_generation_projects ?? ""
						},
						what_is_being_done_to_get_out_of_this_situation = '${
							workAndIncomes.what_is_being_done_to_get_out_of_this_situation ??
							""
						}',
						retirement_benefit_value = ${workAndIncomes.retirement_benefit_value ?? ""},
						continuing_provision_benefit_value = ${
							workAndIncomes.continuing_provision_benefit_value ?? ""
						},
						sick_pay_benefit_value = ${workAndIncomes.sick_pay_benefit_value ?? ""},
						bolsa_familia_benefit_value = ${
							workAndIncomes.bolsa_familia_benefit_value ?? ""
						},
						brazil_financial_assistance_benefit_value = ${
							workAndIncomes.brazil_financial_assistance_benefit_value ?? ""
						},
						other_benefit_value = ${workAndIncomes.other_benefit_value ?? ""},
						family_average_monthly_income_value = ${
							workAndIncomes.family_average_monthly_income_value ?? ""
						},
						past_work_category = ${workAndIncomes.past_work_category ?? ""},
						past_work_sector = ${workAndIncomes.past_work_sector ?? ""},
						comment_work_and_income = '${workAndIncomes.comment_work_and_income ?? ""}',
						user = ${workAndIncomes.user ?? ""}
					where person = ${personId ?? ""}`
			);
		}

		return ctx.send({ message: "Ok" });
	},
};
