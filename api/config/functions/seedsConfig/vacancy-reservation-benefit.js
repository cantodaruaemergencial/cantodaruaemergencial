const cotaRacial = require("../../../seeds/vacancy-reservation-benefit/cota-racial.json");
const egressoSistemaPrisional = require("../../../seeds/vacancy-reservation-benefit/egresso-sistema-prisional.json");
const lgbt = require("../../../seeds/vacancy-reservation-benefit/lgbt.json");
const outros = require("../../../seeds/vacancy-reservation-benefit/outros.json");
const pcd = require("../../../seeds/vacancy-reservation-benefit/pcd.json");

const vacancyReservationBenefitOptions = [
	cotaRacial,
	egressoSistemaPrisional,
	lgbt,
	outros,
	pcd,
];

module.exports = {
	vacancyReservationBenefitOptions,
};
