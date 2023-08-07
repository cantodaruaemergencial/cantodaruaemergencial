"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
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
