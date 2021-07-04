const _ = require("lodash");

const jsonToCsv = (json) => {
  const fields = Object.keys(json[0]);
  const replacer = function (key, value) {
    return value === null ? "" : value;
  };
  let csv = json.map(function (row) {
    return fields
      .map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer);
      })
      .join(",");
  });
  csv.unshift(fields.join(",")); // add header column
  csv = csv.join("\r\n");
  return csv;
};

const query = async (query, params) => {
  const knex = strapi.connections.default;
  return await knex.raw(query, params);
};

const getQuery = async (ctx, filename, q, params, isArray = true) => {
  const r = await query(q, params);
  ctx.set("Content-Type", "text/csv");
  ctx.set("Content-Disposition", 'attachment; filename="' + filename + '"');
  const c = jsonToCsv(isArray ? r[0] : r[0][0]);
  ctx.send(c);
};

module.exports = {
  monthly: async (ctx) => {
    const params = {
      year: Number(ctx.query.year),
      month: Number(ctx.query.month),
    };

    return getQuery(
      ctx,
      "mensal.csv",
      "select " +
        "p.cardnumber as numero, p.name as nome, p.birthdate as nacimento, " +
        "p.mothername as mae, p.birthplace as naturalidade, p.generalregister as rg, p.cpf as cpf, " +
        "(select count(1) from person_entrances e " +
        "where e.person = p.id and month(e.datetime) = :month and year(e.datetime) = :year) as entradas " +
        "from people p " +
        "order by name;",
      params,
      true
    );
  },
};
