import * as core from './classes';
import * as server from './server';
import * as coreIntegrations from './core_integrations';

/*!
 * Accentio Basic Api Framework
 * Copyright(c) 2022
 */

module.exports.Controller = core.Controller;
module.exports.Route = core.Route;
module.exports.Middleware = core.Middleware;
module.exports.FileGettedFromFolder = core.FileGettedFromFolder;

module.exports.ExpressApp = server.ExpressApp

module.exports.SwaggerIntegration = coreIntegrations.SwaggerIntegration;
