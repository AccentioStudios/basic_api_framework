var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import express from 'express';
import { Middleware } from '../classes';
import { getModulesGlob } from '../utils/getModulesFromFolder';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as doctrine from 'doctrine';
import { extractRouteFromJsDoc } from '../utils/extractRouteFromJsDoc';
export class ExpressApp {
    constructor() {
        this.app = express();
    }
    init() {
        return new Promise((resolve, reject) => {
            this.maintenanceMode();
            this.app.use(helmet());
            this.app.use(bodyParser.json());
            this.app.listen(process.env.PORT || 5000, () => {
                console.log(`💻 - Starting Server: port ${process.env.PORT || 5000}`);
                console.log();
                console.log(`💻 - Starting as maintenance mode`);
                console.log();
                resolve(this.app);
            });
        });
    }
    registerMiddlewares(middlewaresFiles) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (middlewaresFiles.length > 0 && middlewaresFiles != null) {
                    yield middlewaresFiles.forEach((middlewaresFile) => __awaiter(this, void 0, void 0, function* () {
                        const middleware = Middleware.fromFileGetted(middlewaresFile);
                        if (middleware != null) {
                            if (middleware.path !== null && middleware.path !== '' && middleware.path !== undefined) {
                                if (middleware.callback != null && middleware.callback != undefined) {
                                    this.app.use(middleware.path, yield middleware.funcs, yield middleware.callback);
                                }
                                else {
                                    this.app.use(middleware.path, yield middleware.funcs);
                                }
                                resolve();
                            }
                            else {
                                this.app.use(yield middleware.funcs);
                                resolve();
                            }
                        }
                        else {
                            resolve();
                        }
                    }));
                }
                else {
                    resolve();
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    registerInternalMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coreMiddlewaresFiles = yield getModulesGlob('../middlewares/**.middleware.+(ts|js)', { cwd: __dirname, realpath: true });
                return this.registerMiddlewares(coreMiddlewaresFiles);
            }
            catch (error) {
                console.error('Error trying to register core middlewares');
                throw (error);
            }
        });
    }
    initMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.registerInternalMiddlewares();
                console.log('🐵 - Registering middlewares...');
                console.log();
                const middlewaresFiles = yield getModulesGlob('./src/core/middlewares/**.middleware.ts', { realpath: true });
                return this.registerMiddlewares(middlewaresFiles);
            }
            catch (error) {
                console.error('☹ - Error Registering middlewares', error);
                process.exit(1);
            }
        });
    }
    registerRouter(expressRouter) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (expressRouter) {
                console.log('📪 - Registering Routes...');
                console.log();
                this.app.use(expressRouter);
            }
            resolve();
        }));
    }
    maintenanceMode(active = true) {
        this.app.set('maintenance', active);
    }
    log(active = true) {
        this.app.set('log', active);
    }
    generateAndRegisterRoutes() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a, e_2, _b;
            var _c;
            const controllersFiles = yield getModulesGlob('./src/features/**/controller/**.controller.ts', { realpath: true });
            var expressRouter = express.Router();
            const allRoutes = [];
            try {
                for (var controllersFiles_1 = __asyncValues(controllersFiles), controllersFiles_1_1; controllersFiles_1_1 = yield controllersFiles_1.next(), !controllersFiles_1_1.done;) {
                    const controllerFile = controllersFiles_1_1.value;
                    const controllerRoutes = [];
                    const _module = controllerFile.module.default;
                    const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
                    const jsdoc = controllerFile.content.match(jsDocRegex) || [];
                    let controllerInfo = {};
                    try {
                        for (var jsdoc_1 = (e_2 = void 0, __asyncValues(jsdoc)), jsdoc_1_1; jsdoc_1_1 = yield jsdoc_1.next(), !jsdoc_1_1.done;) {
                            const annotation = jsdoc_1_1.value;
                            let jsDocComment = doctrine.parse(annotation, { unwrap: true });
                            if (jsDocComment.tags.find(x => x.title == 'api')) {
                                controllerInfo = {
                                    info: {
                                        path: jsDocComment.tags.find(x => x.title === 'api').description,
                                        description: ((_c = jsDocComment.tags.find(x => x.title === 'description')) === null || _c === void 0 ? void 0 : _c.description) || '', // path desc
                                    },
                                    controller: _module
                                };
                                continue;
                            }
                            const route = extractRouteFromJsDoc(jsDocComment);
                            if (route) {
                                route.controllerInfo = controllerInfo;
                                controllerRoutes.push(route);
                                allRoutes.push(route);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (jsdoc_1_1 && !jsdoc_1_1.done && (_b = jsdoc_1.return)) yield _b.call(jsdoc_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    yield this.registerRoutesOfController(controllerRoutes, expressRouter);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (controllersFiles_1_1 && !controllersFiles_1_1.done && (_a = controllersFiles_1.return)) yield _a.call(controllersFiles_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            yield this.registerRouter(expressRouter);
            resolve(allRoutes);
        }));
    }
    registerRoutesOfController(routesOfController, expressRouter) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield Object.keys(routesOfController).forEach((key, index) => {
                var _a, _b, _c, _d, _e, _f;
                const route = routesOfController[index];
                if (route && route.controllerInfo && route.controllerInfo.controller) {
                    const handler = (_b = (_a = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _a === void 0 ? void 0 : _a.controller) === null || _b === void 0 ? void 0 : _b.methods[index];
                    if (route.method === 'get')
                        expressRouter.get(`${(_d = (_c = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.path}${route.path}`, (req, res) => handler(req, res));
                    if (route.method === 'post')
                        expressRouter.post(`${(_f = (_e = route === null || route === void 0 ? void 0 : route.controllerInfo) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.path}${route.path}`, (req, res) => handler(req, res));
                }
            });
            resolve();
        }));
    }
}
