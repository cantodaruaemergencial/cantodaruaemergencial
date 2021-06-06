"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find2(ctx) {
    const knex = strapi.connections.default;

    const params = {
      limit: Number(ctx.query.limit),
      offset: Number(ctx.query.start),
      filter: ctx.query.filter ? "%" + ctx.query.filter + "%" : "%",
      numericFilter: ctx.query.filter ? ctx.query.filter : "0",
    };

    const result = await knex.raw(
      "select " +
        "p.Id, p.Name, p.SocialName, p.CardNumber, " +
        "(select pe1.datetime from person_entrances pe1 where pe1.person = p.id order by pe1.datetime desc limit 1) as LastEntranceDate, " +
        "least(cast((select count(1) from person_entrances pe2 where pe2.person = p.id and date(pe2.datetime) = date(now())) as unsigned),1) as EnteredToday, " +
        "greatest(0, cast((select count(1) from person_entrances pe3 where pe3.person = p.id) as unsigned)) as Entrances " +
        "from people p " +
        "where Name like :filter or SocialName like :filter or CardNumber like :numericFilter " +
        "order by p.CardNumber " +
        "limit :limit offset :offset;",
      params
    );

    ctx.send(result[0]);
  },

  async create(ctx) {
    const knex = strapi.connections.default;

    let inputEntity = ctx.request.body;
    const nextCardNumber = await knex.raw(
      "select max(cast(cardnumber as unsigned)) + 1 as nextCardNumber from people p"
    );
    if (
      nextCardNumber &&
      nextCardNumber[0] &&
      nextCardNumber[0][0] &&
      nextCardNumber[0][0]["nextCardNumber"]
    ) {
      inputEntity.CardNumber = nextCardNumber[0][0]["nextCardNumber"];
    }
    let outputEntity = await strapi.services.person.create(inputEntity);
    return sanitizeEntity(outputEntity, { model: strapi.models.person });
  },
};
