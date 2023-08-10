"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async find2(ctx) {
		const knex = strapi.connections.default;

		const f = ctx.query.filter;

		const params = {
			limit: Number(ctx.query.limit),
			offset: Number(ctx.query.start),
			filter: f ? "%" + f + "%" : "%",
			numericFilter: f ? f : "0",
			isFilter: f ? true : false,
			isNumeric: /^\d+$/.test(f),
		};

		const result = await knex.raw(
			"select " +
				"p.id, p.name, p.social_name, p.card_number, " +
				"(select pe1.date from person_entrances pe1 where pe1.person = p.id order by pe1.date desc limit 1) as LastEntranceDate, " +
				"least(cast((select count(1) from person_entrances pe2 where pe2.person = p.id and date(pe2.date) = date(now())) as unsigned),1) as EnteredToday, " +
				"greatest(0, cast((select count(1) from person_entrances pe3 where pe3.person = p.id) as unsigned)) as Entrances " +
				"from person p " +
				"where ( " +
				"(:isFilter = 0) or " +
				"(:isFilter = 1 and :isNumeric = 1 and card_number like :numericFilter) or " +
				"(:isFilter = 1 and :isNumeric = 0 and ( " +
				"   name like :filter " +
				"   or soundex(name) like concat(soundex(:numericFilter), '%') " +
				"   or social_name like :filter " +
				"   or soundex(social_name) like concat(soundex(:numericFilter), '%') " +
				")) " +
				")" +
				"order by cast(p.card_number as unsigned) " +
				"limit :limit offset :offset;",
			params
		);

		ctx.send(result[0]);
	},

	async create(ctx) {
		const knex = strapi.connections.default;

		let inputEntity = ctx.request.body;
		console.log({ inputEntity });
		const nextCardNumber = await knex.raw(
			"select max(cast(card_number as unsigned)) + 1 as nextCardNumber from person p"
		);
		if (
			nextCardNumber &&
			nextCardNumber[0] &&
			nextCardNumber[0][0] &&
			nextCardNumber[0][0]["nextCardNumber"]
		) {
			inputEntity.card_number = nextCardNumber[0][0]["nextCardNumber"];
		} else {
			inputEntity.card_number = "1";
		}
		let outputEntity = await strapi.services.person.create(inputEntity);
		return sanitizeEntity(outputEntity, { model: strapi.models.person });
	},
};
