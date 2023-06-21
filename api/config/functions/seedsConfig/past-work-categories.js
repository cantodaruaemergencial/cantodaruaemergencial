const autonomoContrato = require("../../../seeds/past-work-categories/autonomo-contrato.json");
const bicos = require("../../../seeds/past-work-categories/bicos.json");
const carteiraAssinada = require("../../../seeds/past-work-categories/carteira-assinada.json");
const informal = require("../../../seeds/past-work-categories/informal.json");
const semiescravo = require("../../../seeds/past-work-categories/semiescravo.json");
const voluntarioSolidario = require("../../../seeds/past-work-categories/voluntario-solidario.json");

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
