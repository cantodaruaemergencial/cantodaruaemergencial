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
      "p.cardnumber as numero, p.name as nome, date_format(p.birthdate,'%Y-%m-%d') as nascimento, " +
      "p.mothername as mae, p.birthplace as naturalidade, p.generalregister as rg, p.cpf as cpf, " +
      "(select count(1) from person_entrances e " +
      "where e.person = p.id and month(e.datetime) = :month and year(e.datetime) = :year) as entradas " +
      "from people p " +
      "having entradas > 0 " +
      "order by name;",
      params,
      true
    );
  },

  people: async (ctx) => {
    const params = {
      from: Number(ctx.query.from),
      to: Number(ctx.query.to),
    }

    return getQuery(
      ctx,
      "pessoas.csv", 
      "select " +
      "p.cardnumber as cartao, " +
      "ifnull(datediff(date(now()), p.birthdate),0) div 365 as idade, " +
      "p.birthplace as origem, " +
      "right(p.birthplace, 2) as estado, " +
      "sc.SkinColor as cor_raca, " +
      "g.Gender as sexo, " +
      "ifnull(p.Childrens,0) as filhos, " +
      "p.HasHabitation as moradia, " +
      "datediff(date(now()), p.homelesssince) as tempo_rua_dias, " +
      "p.HomelessTime as tempo_rua, " +
      "ifnull(p.HasEmergencyAid, 0) as auxilio_emergencial, " +
      "ifnull(p.HasPbhBasket, 0) as cesta_pbh, " +
      "ifnull(p.HasUniqueRegister, 0) as cad_unico, " +
      "ifnull(p.HasGeneralRegister, 0) as possui_rg, " +
      "ifnull(p.HasCpf, 0) as possui_cpf, " +
      "ifnull(p.HasBirthCertificate, 0) as possui_certidao_nascimento, " +
      "ms.MaritalStatus as estado_civil, " +
      "st.SchoolTraining as formacao_escolar, " +
      "(select count(1) from people__benefits pb where pb.person_id = p.id and pb.benefit_id = 1) as bolsa_moradia, " +
      "(select count(1) from people__benefits pb where pb.person_id = p.id and pb.benefit_id = 2) as bolsa_familia, " +
      "(select count(1) from people__benefits pb where pb.person_id = p.id and pb.benefit_id = 3) as bpc, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 1) as servico_abrigo, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 2) as servico_albergue, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 3) as servico_centro_pop, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 4) as servico_pastoral_rua, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 5) as servico_abordagem_social, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 6) as servico_republica, " +
      "(select count(1) from people__external_services pes where pes.person_id = p.id and pes.`external-service_id` = 7) as servico_nenhum_servico " +
      "from people p " +
      "left join skin_colors sc on p.skin_color = sc.id " +
      "left join genders g on p.gender = g.id " +
      "left join marital_statuses ms on p.marital_status = ms.id " +
      "left join school_trainings st on p.school_training = st.id " +
      "where p.cardnumber >= :from and p.cardnumber <= :to " +
      "order by cast(p.cardnumber as unsigned)",
      params, 
      true
    )
  }
};
