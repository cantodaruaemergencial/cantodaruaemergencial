"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const query = async (query) => {
	const knex = strapi.connections.default;
	return await knex.raw(query);
};

const getQuery = async (ctx, q, isArray = true) => {
	const r = await query(q);
	ctx.send(isArray ? r[0] : r[0][0]);
};

module.exports = {
	findByUser: async (ctx) => {
		const userId = ctx.params.userid;
		if (isNaN(Number(userId))) throw Error("Internal server error");
		return getQuery(
			ctx,
			`select * from user_associations where user = '${userId}'`
		);
	},
};
