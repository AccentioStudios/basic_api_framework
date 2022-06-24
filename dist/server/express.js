"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
var express = require("express");
var classes_1 = require("../classes");
var getModulesFromFolder_1 = require("../utils/getModulesFromFolder");
var path = require("path");
var helmet_1 = __importDefault(require("helmet"));
var bodyParser = require("body-parser");
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
    ExpressApp.prototype.addMiddlewaresToExpress = function (middlewaresFiles) {
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
                        return [4 /*yield*/, (0, getModulesFromFolder_1.getModulesFromFolder)(path.resolve(__dirname, '../middlewares'), 'ts', ['index'])];
                    case 1:
                        coreMiddlewaresFiles = _a.sent();
                        return [2 /*return*/, this.addMiddlewaresToExpress(coreMiddlewaresFiles)];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error trying to register core middlewares');
                        throw (error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpressApp.prototype.registerMiddlewares = function () {
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
                        return [4 /*yield*/, (0, getModulesFromFolder_1.getModulesFromFolder)(path.resolve(process.cwd(), './src/core/middlewares'), 'ts', ['index'])];
                    case 2:
                        middlewaresFiles = _a.sent();
                        return [2 /*return*/, this.addMiddlewaresToExpress(middlewaresFiles)];
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
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
