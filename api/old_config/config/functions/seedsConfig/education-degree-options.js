const analfabetx = require("../../../seeds/education-degree-options/analfabetx.json");
const assinaNome = require("../../../seeds/education-degree-options/assina-nome.json");
const doutorado = require("../../../seeds/education-degree-options/doutorado.json");
const fundamentalCompleto = require("../../../seeds/education-degree-options/fundamental-completo.json");
const fundamentalIncompleto = require("../../../seeds/education-degree-options/fundamental-incompleto.json");
const leEscreve = require("../../../seeds/education-degree-options/le-escreve.json");
const medioTecnicoCompleto = require("../../../seeds/education-degree-options/medio-tecnico-completo.json");
const medioTecnicoIncompleto = require("../../../seeds/education-degree-options/medio-tecnico-incompleto.json");
const mestrado = require("../../../seeds/education-degree-options/mestrado.json");
const posGraduacao = require("../../../seeds/education-degree-options/pos-graduacao.json");
const superiorCompleto = require("../../../seeds/education-degree-options/superior-completo.json");
const superiorIncompleto = require("../../../seeds/education-degree-options/superior-incompleto.json");

const educationDegreeOptions = [
	analfabetx,
	assinaNome,
	doutorado,
	fundamentalCompleto,
	fundamentalIncompleto,
	leEscreve,
	medioTecnicoCompleto,
	medioTecnicoIncompleto,
	mestrado,
	posGraduacao,
	superiorCompleto,
	superiorIncompleto,
];

module.exports = {
	educationDegreeOptions,
};
