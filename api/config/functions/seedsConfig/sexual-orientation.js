const heterossexual = require("../../../seeds/sexual-orientation/heterossexual.json");
const homossexual = require("../../../seeds/sexual-orientation/homossexual.json");
const naoDeclarado = require("../../../seeds/sexual-orientation/nao-declarado.json");

const sexualDeclarationOptions = [heterossexual, homossexual, naoDeclarado];

module.exports = {
	sexualDeclarationOptions,
};
