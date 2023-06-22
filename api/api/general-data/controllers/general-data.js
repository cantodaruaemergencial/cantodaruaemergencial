const query = async (query) => {
	const knex = strapi.connections.default;
	return await knex.raw(query);
};

const getQuery = async (q, isArray = true) => {
	const r = await query(q);
	return isArray ? r[0] : r[0][0];
};

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
		const personVacancyReservationBenefitByUser = await getQuery(
			`select * from person_vacancy_reservation_benefits where person = ${personId}`
		);
		const safetiesByUser = await getQuery(
			`select * from person_vacancy_reservation_benefits where person = ${personId}`
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
			infrastruture: infrastrutureByUser,
			judicialSituation: judicialSituationsByUser,
			personVacancyReservationBenefit: personVacancyReservationBenefitByUser,
			safeties: safetiesByUser,
			socialAssistanceNetwork: socialAssistanceNetworkByUser,
			streetPaths: streetPathsByUser,
			workAndIncomes: workAndIncomesByUser,
		});
	},
};
