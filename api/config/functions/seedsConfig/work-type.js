const aposentado = require("../../../seeds/work-type/aposentado.json");
const desempregado = require("../../../seeds/work-type/desempregado.json");
const mercadoFormal = require("../../../seeds/work-type/mercado-formal.json");
const mercadoInformal = require("../../../seeds/work-type/mercado-informal.json");
const outro = require("../../../seeds/work-type/outro.json");

const workTypeOptions = [
	aposentado,
	desempregado,
	mercadoFormal,
	mercadoInformal,
	outro,
];

module.exports = {
	workTypeOptions,
};
