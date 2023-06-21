const comercio = require("../../../seeds/past-work-sectors/comercio.json");
const industria = require("../../../seeds/past-work-sectors/industria.json");
const naoSeAplica = require("../../../seeds/past-work-sectors/nao-se-aplica.json");
const profissionalLiberal = require("../../../seeds/past-work-sectors/profissional-liberal.json");
const servicos = require("../../../seeds/past-work-sectors/servicos.json");
const servidorPublico = require("../../../seeds/past-work-sectors/servidor-publico.json");

const pastWorkSectorOptions = [
	comercio,
	industria,
	naoSeAplica,
	profissionalLiberal,
	servicos,
	servidorPublico,
];

module.exports = {
	pastWorkSectorOptions,
};
