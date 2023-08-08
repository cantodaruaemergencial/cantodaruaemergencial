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
			"select * from person p " +
				"where ( " +
				"(:isFilter = 0) or " +
				"(:isFilter = 1 and :isNumeric = 1 and p.card_number like :numericFilter) or " +
				"(:isFilter = 1 and :isNumeric = 0 and ( " +
				"   p.name like :filter " +
				"   or soundex(p.name) like concat(soundex(:numericFilter), '%') " +
				"   or p.social_name like :filter " +
				"   or soundex(p.social_name) like concat(soundex(:numericFilter), '%') " +
				")) " +
				") " +
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
