const amasiado = require("../../../seeds/marital-status/amasiadx.json");
const casado = require("../../../seeds/marital-status/casadx.json");
const divorciado = require("../../../seeds/marital-status/divorciadox.json");
const separado = require("../../../seeds/marital-status/separadx.json");
const solteiro = require("../../../seeds/marital-status/solteirx.json");
const uniaoEstavel = require("../../../seeds/marital-status/uniao-estavel.json");
const viuvo = require("../../../seeds/marital-status/viuvx.json");

const maritalStatusOptions = [
	amasiado,
	casado,
	divorciado,
	separado,
	solteiro,
	uniaoEstavel,
	viuvo,
];

module.exports = {
	maritalStatusOptions,
};
