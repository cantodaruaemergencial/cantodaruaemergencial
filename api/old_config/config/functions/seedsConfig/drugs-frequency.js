const eventual = require("../../../seeds/drugs-frequency/eventual.json");
const experimental = require("../../../seeds/drugs-frequency/experimental.json");
const prejudicial = require("../../../seeds/drugs-frequency/prejudicial.json");
const recreativo = require("../../../seeds/drugs-frequency/recreativo.json");

const drugsFrequencyOptions = [eventual, experimental, prejudicial, recreativo];

module.exports = {
	drugsFrequencyOptions,
};
