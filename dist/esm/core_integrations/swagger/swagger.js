var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SwaggerUIMiddleware from './swaggerui.middleware';
export class SwaggerIntegration {
    constructor(swaggerDocs) {
        this.swaggerDocs = swaggerDocs;
    }
    register(expressApp, routes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const middleware = new SwaggerUIMiddleware(yield this.generateOpenApi3(routes));
                if (middleware) {
                    yield expressApp.app.use(middleware.path, middleware.funcs, middleware.callback);
                }
            }
            catch (error) {
                console.error('Error registering Swagger Integration', error);
            }
        });
    }
    generateOpenApi3(routes) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let apis = {
                tags: [],
                paths: {},
            };
            for (const route of routes) {
                if (route && route.path && route.method) {
                    if (!apis.tags.find(x => { var _a, _b; return x.name === ((_b = (_a = route.controllerInfo) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.path); })) {
                        apis.tags.push({
                            name: ((_b = (_a = route.controllerInfo) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.path) || '',
                            description: ((_d = (_c = route.controllerInfo) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.description) || '',
                        });
                    }
                    apis.paths[`${(_f = (_e = route.controllerInfo) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.path}${route.path}`] = {
                        [route.method]: {
                            tags: [
                                ((_h = (_g = route.controllerInfo) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.path) || ''
                            ],
                            summary: route.description,
                            responses: {
                                200: {
                                    description: 'OK Example'
                                }
                            }
                        }
                    };
                }
            }
            this.swaggerDocs['tags'] = apis.tags;
            this.swaggerDocs['paths'] = apis.paths;
            return this.swaggerDocs;
        });
    }
}
