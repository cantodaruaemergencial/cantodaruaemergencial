"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const _ = require("lodash");
const { genderOptions } = require("./seedsConfig/gender");
const { selfDeclarationOptions } = require("./seedsConfig/self-declaration");
const { maritalStatusOptions } = require("./seedsConfig/marital-status");
const { drugsFrequencyOptions } = require("./seedsConfig/drugs-frequency");
const {
	sexualDeclarationOptions,
} = require("./seedsConfig/sexual-orientation");
const {
	educationDegreeOptions,
} = require("./seedsConfig/education-degree-options");
const { workTypeOptions } = require("./seedsConfig/work-type");
const {
	pastWorkCategoryOptions,
} = require("./seedsConfig/past-work-categories");
const { pastWorkSectorOptions } = require("./seedsConfig/past-work-sectors");
const {
	vacancyReservationBenefitOptions,
} = require("./seedsConfig/vacancy-reservation-benefit");
const { associationOptions } = require("./seedsConfig/association");

const allowRoute = async (controller, methods) => {
	const service = await strapi.plugins["users-permissions"].services
		.userspermissions;
	const plugins = await service.getPlugins("en");
	const roles = await service.getRoles();

	const getRole = async (type) => {
		const { id } = _.find(roles, (x) => x.type === type);
		return service.getRole(id, plugins);
	};

	const setPermission = (role, type, controller, action, enabled) => {
		try {
			role.permissions[type].controllers[controller][action].enabled = enabled;
		} catch (e) {
			console.error(
				`Couldn't set permission ${role.name} ${type}:${controller}:${action}:${enabled}`
			);
		}
	};

	const publicRole = await getRole("public");
	methods.forEach((method) => {
		setPermission(publicRole, "application", controller, method, true);
	});
	await service.updateRole(publicRole.id, publicRole);
};

const allowGetRoutes = async (controller) => {
	await allowRoute(controller, ["count", "find", "findone"]);
};

const createSeeds = async (controller, seeds) => {
	const existsRegister = await strapi.services[controller].findOne();

	if (!existsRegister) {
		seeds.forEach(async (opt) => {
			await strapi.services[controller].create({
				name: opt.name,
			});
		});
	}
};

module.exports = async () => {
	allowGetRoutes("gender");
	allowGetRoutes("marital-status");
	allowGetRoutes("self-declaration");
	if (process.env.NODE_ENV === "development") {
		createSeeds("gender", genderOptions);
		createSeeds("self-declaration", selfDeclarationOptions);
		createSeeds("marital-status", maritalStatusOptions);
		createSeeds("drugs-frequency", drugsFrequencyOptions);
		createSeeds("education-degree-options", educationDegreeOptions);
		createSeeds("sexual-orientation", sexualDeclarationOptions);
		createSeeds("work-type", workTypeOptions);
		createSeeds("past-work-category", pastWorkCategoryOptions);
		createSeeds("past-work-sector", pastWorkSectorOptions);
		createSeeds(
			"vacancy-reservation-benefit",
			vacancyReservationBenefitOptions
		);
		createSeeds("association", associationOptions);
	}
	return;
};
