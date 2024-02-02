const autonomoContrato = require("../../../seeds/past-work-category/autonomo-contrato.json");
const bicos = require("../../../seeds/past-work-category/bicos.json");
const carteiraAssinada = require("../../../seeds/past-work-category/carteira-assinada.json");
const informal = require("../../../seeds/past-work-category/informal.json");
const semiescravo = require("../../../seeds/past-work-category/semiescravo.json");
const voluntarioSolidario = require("../../../seeds/past-work-category/voluntario-solidario.json");

const pastWorkCategoryOptions = [
	autonomoContrato,
	bicos,
	carteiraAssinada,
	informal,
	semiescravo,
	voluntarioSolidario,
];

module.exports = {
	pastWorkCategoryOptions,
};
