const comercio = require("../../../seeds/past-work-sector/comercio.json");
const industria = require("../../../seeds/past-work-sector/industria.json");
const naoSeAplica = require("../../../seeds/past-work-sector/nao-se-aplica.json");
const profissionalLiberal = require("../../../seeds/past-work-sector/profissional-liberal.json");
const servicos = require("../../../seeds/past-work-sector/servicos.json");
const servidorPublico = require("../../../seeds/past-work-sector/servidor-publico.json");

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
