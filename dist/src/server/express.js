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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
var express = require("express");
var classes_1 = require("../classes");
var getModulesFromFolder_1 = require("../utils/getModulesFromFolder");
var helmet_1 = __importDefault(require("helmet"));
var bodyParser = require("body-parser");
var doctrine = __importStar(require("doctrine"));
var extractRouteFromJsDoc_1 = require("../utils/extractRouteFromJsDoc");
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
        this.app = express();
    }
    ExpressApp.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.maintenanceMode();
            _this.app.use((0, helmet_1.default)());
            _this.app.use(bodyParser.json());
            _this.app.listen(process.env.PORT || 5000, function () {
                console.log("\uD83D\uDCBB - Starting Server: port ".concat(process.env.PORT || 5000));
                console.log();
                console.log("\uD83D\uDCBB - Starting as maintenance mode");
                console.log();
                resolve(_this.app);
            });
        });
    };
    ExpressApp.prototype.registerMiddlewares = function (middlewaresFiles) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(middlewaresFiles.length > 0 && middlewaresFiles != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, middlewaresFiles.forEach(function (middlewaresFile) { return __awaiter(_this, void 0, void 0, function () {
                                var middleware, _a, _b, _c, _d, _e, _f, _g, _h;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            middleware = classes_1.Middleware.fromFileGetted(middlewaresFile);
                                            if (!(middleware != null)) return [3 /*break*/, 9];
                                            if (!(middleware.path !== null && middleware.path !== '' && middleware.path !== undefined)) return [3 /*break*/, 6];
                                            if (!(middleware.callback != null && middleware.callback != undefined)) return [3 /*break*/, 3];
                                            _b = (_a = this.app).use;
                                            _c = [middleware.path];
                                            return [4 /*yield*/, middleware.funcs];
                                        case 1:
                                            _c = _c.concat([_j.sent()]);
                                            return [4 /*yield*/, middleware.callback];
                                        case 2:
                                            _b.apply(_a, _c.concat([_j.sent()]));
                                            return [3 /*break*/, 5];
                                        case 3:
                                            _e = (_d = this.app).use;
                                            _f = [middleware.path];
                                            return [4 /*yield*/, middleware.funcs];
                                        case 4:
                                            _e.apply(_d, _f.concat([_j.sent()]));
                                            _j.label = 5;
                                        case 5:
                                            resolve();
                                            return [3 /*break*/, 8];
                                        case 6:
                                            _h = (_g = this.app).use;
                                            return [4 /*yield*/, middleware.funcs];
                                        case 7:
                                            _h.apply(_g, [_j.sent()]);
                                            resolve();
                                            _j.label = 8;
                                        case 8: return [3 /*break*/, 10];
                                        case 9:
                                            resolve();
                                            _j.label = 10;
                                        case 10: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        resolve();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    ExpressApp.prototype.registerInternalMiddlewares = function () {
        return __awaiter(this, void 0, void 0, function () {
            var coreMiddlewaresFiles, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, getModulesFromFolder_1.getModulesGlob)('../middlewares/**.middleware.ts', { cwd: __dirname, realpath: true })];
                    case 1:
                        coreMiddlewaresFiles = _a.sent();
                        return [2 /*return*/, this.registerMiddlewares(coreMiddlewaresFiles)];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error trying to register core middlewares');
                        throw (error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpressApp.prototype.initMiddlewares = function () {
        return __awaiter(this, void 0, void 0, function () {
            var middlewaresFiles, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.registerInternalMiddlewares()];
                    case 1:
                        _a.sent();
                        console.log('🐵 - Registering middlewares...');
                        console.log();
                        return [4 /*yield*/, (0, getModulesFromFolder_1.getModulesGlob)('./src/core/middlewares/**.middleware.ts', { realpath: true })];
                    case 2:
                        middlewaresFiles = _a.sent();
                        return [2 /*return*/, this.registerMiddlewares(middlewaresFiles)];
                    case 3:
                        error_3 = _a.sent();
                        console.error('☹ - Error Registering middlewares', error_3);
                        process.exit(1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExpressApp.prototype.registerRouter = function (expressRouter) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (expressRouter) {
                    console.log('📪 - Registering Routes...');
                    console.log();
                    this.app.use(expressRouter);
                }
                resolve();
                return [2 /*return*/];
            });
        }); });
    };
    ExpressApp.prototype.maintenanceMode = function (active) {
        if (active === void 0) { active = true; }
        this.app.set('maintenance', active);
    };
    ExpressApp.prototype.generateExpressRoutes = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var controllersFiles, controllersFiles_1, controllersFiles_1_1, controllerFile, _module, jsDocRegex, jsdoc, controllerInfo, routes, jsdoc_1, jsdoc_1_1, annotation, jsDocComment, route, e_1_1, e_2_1;
            var e_2, _a, e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, getModulesFromFolder_1.getModulesGlob)('./src/features/**/controller/**.controller.ts', { realpath: true })];
                    case 1:
                        controllersFiles = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 19, 20, 25]);
                        controllersFiles_1 = __asyncValues(controllersFiles);
                        _c.label = 3;
                    case 3: return [4 /*yield*/, controllersFiles_1.next()];
                    case 4:
                        if (!(controllersFiles_1_1 = _c.sent(), !controllersFiles_1_1.done)) return [3 /*break*/, 18];
                        controllerFile = controllersFiles_1_1.value;
                        _module = controllerFile.module.default;
                        jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
                        jsdoc = controllerFile.content.match(jsDocRegex) || [];
                        controllerInfo = {};
                        routes = [];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 10, 11, 16]);
                        jsdoc_1 = (e_1 = void 0, __asyncValues(jsdoc));
                        _c.label = 6;
                    case 6: return [4 /*yield*/, jsdoc_1.next()];
                    case 7:
                        if (!(jsdoc_1_1 = _c.sent(), !jsdoc_1_1.done)) return [3 /*break*/, 9];
                        annotation = jsdoc_1_1.value;
                        jsDocComment = doctrine.parse(annotation, { unwrap: true });
                        if (jsDocComment.tags[0].title === 'api') {
                            controllerInfo = {
                                info: {
                                    path: jsDocComment.tags[0].description,
                                    description: jsDocComment.tags[1].name // path name
                                },
                                controller: _module
                            };
                            return [3 /*break*/, 8];
                        }
                        route = (0, extractRouteFromJsDoc_1.extractRouteFromJsDoc)(jsDocComment);
                        if (route) {
                            route.controllerInfo = controllerInfo;
                            routes.push(route);
                        }
                        _c.label = 8;
                    case 8: return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _c.trys.push([11, , 14, 15]);
                        if (!(jsdoc_1_1 && !jsdoc_1_1.done && (_b = jsdoc_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(jsdoc_1)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        resolve(routes);
                        _c.label = 17;
                    case 17: return [3 /*break*/, 3];
                    case 18: return [3 /*break*/, 25];
                    case 19:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 25];
                    case 20:
                        _c.trys.push([20, , 23, 24]);
                        if (!(controllersFiles_1_1 && !controllersFiles_1_1.done && (_a = controllersFiles_1.return))) return [3 /*break*/, 22];
                        return [4 /*yield*/, _a.call(controllersFiles_1)];
                    case 21:
                        _c.sent();
                        _c.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 24: return [7 /*endfinally*/];
                    case 25: return [2 /*return*/, resolve(null)];
                }
            });
        }); });
    };
    ExpressApp.prototype.routesToExpressRouter = function (routes) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var expressRouter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expressRouter = express.Router();
                        return [4 /*yield*/, Object.keys(routes).forEach(function (key, index) {
                                var _a, _b, _c, _d;
                                var route = routes[index];
                                if (route && route.controllerInfo && route.controllerInfo.controller) {
                                    var handler_1 = (_b = (_a = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _a === void 0 ? void 0 : _a.controller) === null || _b === void 0 ? void 0 : _b.methods[index];
                                    if (route.method === 'get')
                                        expressRouter.get("".concat((_c = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _c === void 0 ? void 0 : _c.info.path).concat(route.path), function (req, res) { return handler_1(req, res); });
                                    if (route.method === 'post')
                                        expressRouter.post("".concat((_d = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _d === void 0 ? void 0 : _d.info.path).concat(route.path), function (req, res) { return handler_1(req, res); });
                                }
                            })];
                    case 1:
                        _a.sent();
                        resolve(expressRouter);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
