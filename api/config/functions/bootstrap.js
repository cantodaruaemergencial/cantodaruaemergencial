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

module.exports = async () => {
  allowGetRoutes("benefit");
  allowGetRoutes("external-service");
  allowGetRoutes("gender");
  allowGetRoutes("marital-status");
  allowGetRoutes("service");
  allowGetRoutes("school-training");
  allowGetRoutes("skin-color");
  return;
};
