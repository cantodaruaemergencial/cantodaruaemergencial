module.exports = {
	findByPerson: async (ctx) => {
		const personId = ctx.params.personid;
		if (isNaN(Number(personId))) throw Error("Internal server error");

		const pastoralAttendanceByUser = await strapi
			.query("pastoral-de-rua-service-attendances")
			.model.query((qb) => {
				qb.where("person", personId).orderBy("service_attendance_date", "desc");
			})
			.fetchAll();

		const entranceByUser = await strapi
			.query("person-entrance")
			.model.query((qb) => {
				qb.where("person", personId).orderBy("date", "desc");
			})
			.fetchAll();

		return {
			attendances: pastoralAttendanceByUser || [],
			entrances: entranceByUser || [],
		};
	},
};
