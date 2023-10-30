const branca = require("../../../seeds/self-declaration/branca.json");
const indigena = require("../../../seeds/self-declaration/indigena.json");
const outras = require("../../../seeds/self-declaration/outras.json");
const parda = require("../../../seeds/self-declaration/parda.json");
const preta = require("../../../seeds/self-declaration/preta.json");

const selfDeclarationOptions = [branca, indigena, outras, parda, preta];

module.exports = {
	selfDeclarationOptions,
};
