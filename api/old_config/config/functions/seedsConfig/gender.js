const homemCisgenero = require("../../../seeds/gender/homem-cisgenero.json");
const homemTransgenero = require("../../../seeds/gender/homem-transgenero.json");
const mulherCisgenero = require("../../../seeds/gender/mulher-cisgenero.json");
const mulherTransgenero = require("../../../seeds/gender/mulher-transgenero.json");
const outros = require("../../../seeds/gender/outros.json");

const genderOptions = [
	homemCisgenero,
	homemTransgenero,
	mulherCisgenero,
	mulherTransgenero,
	outros,
];

module.exports = {
	genderOptions,
};
