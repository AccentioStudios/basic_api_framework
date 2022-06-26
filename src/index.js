"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./classes"), exports);
__exportStar(require("./server"), exports);
__exportStar(require("./core_integrations"), exports);
// import * as core from './classes';
// import * as server from './server';
// import * as coreIntegrations from './core_integrations';
// /*!
//  * Accentio Basic Api Framework
//  * Copyright(c) 2022
//  */
// module.exports.Controller = core.Controller;
// module.exports.Route = core.Route;
// module.exports.Middleware = core.Middleware;
// module.exports.FileGettedFromFolder = core.FileGettedFromFolder;
// module.exports.ExpressApp = server.ExpressApp
// module.exports.SwaggerIntegration = coreIntegrations.SwaggerIntegration;
