import express from 'express';
import { Middleware } from '../classes';
import { getModulesGlob } from '../utils/getModulesFromFolder';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as doctrine from 'doctrine';
import { extractRouteFromJsDoc } from '../utils/extractRouteFromJsDoc';
export class ExpressApp {
    app;
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
        return new Promise(async (resolve, reject) => {
            try {
                if (middlewaresFiles.length > 0 && middlewaresFiles != null) {
                    await middlewaresFiles.forEach(async (middlewaresFile) => {
                        const middleware = Middleware.fromFileGetted(middlewaresFile);
                        if (middleware != null) {
                            if (middleware.path !== null && middleware.path !== '' && middleware.path !== undefined) {
                                if (middleware.callback != null && middleware.callback != undefined) {
                                    this.app.use(middleware.path, await middleware.funcs, await middleware.callback);
                                }
                                else {
                                    this.app.use(middleware.path, await middleware.funcs);
                                }
                                resolve();
                            }
                            else {
                                this.app.use(await middleware.funcs);
                                resolve();
                            }
                        }
                        else {
                            resolve();
                        }
                    });
                }
                else {
                    resolve();
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async registerInternalMiddlewares() {
        try {
            const coreMiddlewaresFiles = await getModulesGlob('../middlewares/**.middleware.ts', { cwd: __dirname, realpath: true });
            return this.registerMiddlewares(coreMiddlewaresFiles);
        }
        catch (error) {
            console.error('Error trying to register core middlewares');
            throw (error);
        }
    }
    async initMiddlewares() {
        try {
            await this.registerInternalMiddlewares();
            console.log('🐵 - Registering middlewares...');
            console.log();
            const middlewaresFiles = await getModulesGlob('./src/core/middlewares/**.middleware.ts', { realpath: true });
            return this.registerMiddlewares(middlewaresFiles);
        }
        catch (error) {
            console.error('☹ - Error Registering middlewares', error);
            process.exit(1);
        }
    }
    registerRouter(expressRouter) {
        return new Promise(async (resolve, reject) => {
            if (expressRouter) {
                console.log('📪 - Registering Routes...');
                console.log();
                this.app.use(expressRouter);
            }
            resolve();
        });
    }
    maintenanceMode(active = true) {
        this.app.set('maintenance', active);
    }
    generateExpressRoutes() {
        return new Promise(async (resolve) => {
            const controllersFiles = await getModulesGlob('./src/features/**/controller/**.controller.ts', { realpath: true });
            for await (const controllerFile of controllersFiles) {
                const _module = controllerFile.module.default;
                const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
                const jsdoc = controllerFile.content.match(jsDocRegex) || [];
                let controllerInfo = {};
                const routes = [];
                for await (const annotation of jsdoc) {
                    let jsDocComment = doctrine.parse(annotation, { unwrap: true });
                    if (jsDocComment.tags[0].title === 'api') {
                        controllerInfo = {
                            info: {
                                path: jsDocComment.tags[0].description,
                                description: jsDocComment.tags[1].name // path name
                            },
                            controller: _module
                        };
                        continue;
                    }
                    const route = extractRouteFromJsDoc(jsDocComment);
                    if (route) {
                        route.controllerInfo = controllerInfo;
                        routes.push(route);
                    }
                }
                resolve(routes);
            }
            return resolve(null);
        });
    }
    routesToExpressRouter(routes) {
        return new Promise(async (resolve, reject) => {
            var expressRouter = express.Router();
            await Object.keys(routes).forEach((key, index) => {
                const route = routes[index];
                if (route && route.controllerInfo && route.controllerInfo.controller) {
                    const handler = route?.controllerInfo?.controller?.methods[index];
                    if (route.method === 'get')
                        expressRouter.get(`${route?.controllerInfo?.info.path}${route.path}`, (req, res) => handler(req, res));
                    if (route.method === 'post')
                        expressRouter.post(`${route?.controllerInfo?.info.path}${route.path}`, (req, res) => handler(req, res));
                }
            });
            resolve(expressRouter);
        });
    }
}
