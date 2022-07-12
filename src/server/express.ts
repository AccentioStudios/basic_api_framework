import express, { Application } from 'express';
import { Controller, ControllerInfo, expressRequestAndResponseType, ExpressRouter, FileGettedFromFolder, Middleware, Route } from '../classes';
import { getModulesGlob } from '../utils/getModulesFromFolder';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as doctrine from 'doctrine';
import { extractRouteFromJsDoc } from '../utils/extractRouteFromJsDoc';

export class ExpressApp {
  app: Application;
  constructor() {
    this.app = express();
  }

  init(): Promise<Application> {
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

  registerMiddlewares(middlewaresFiles: FileGettedFromFolder[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        if (middlewaresFiles.length > 0 && middlewaresFiles != null) {
          await middlewaresFiles.forEach(async (middlewaresFile) => {
            const middleware = Middleware.fromFileGetted(middlewaresFile);
            if (middleware != null) {
              if (middleware.path !== null && middleware.path !== '' && middleware.path !== undefined) {
                if (middleware.callback != null && middleware.callback != undefined) {
                  this.app.use(middleware.path, await middleware.funcs, await middleware.callback);
                } else {
                  this.app.use(middleware.path, await middleware.funcs);
                }
                resolve();
              } else {
                this.app.use(await middleware.funcs);
                resolve();
              }
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      } catch (error: any) {
        reject(error);
      }

    });
  }

  private async registerInternalMiddlewares(): Promise<void> {
    try {
      const coreMiddlewaresFiles = await getModulesGlob('../middlewares/**.middleware.+(ts|js)', { cwd: __dirname, realpath: true });
      return this.registerMiddlewares(coreMiddlewaresFiles);
    } catch (error: any) {
      console.error('Error trying to register core middlewares');
      throw (error);
    }
  }

  async initMiddlewares(): Promise<void> {
    try {
      await this.registerInternalMiddlewares();
      console.log('🐵 - Registering middlewares...');
      console.log();

      const path = 'core/middlewares/**.middleware.+(ts|js)';
      const cwd = process.cwd().replace(/\\/g, "/");
      const middlewaresFiles = await getModulesGlob(path, { realpath: true, cwd: cwd });

      return this.registerMiddlewares(middlewaresFiles);
    } catch (error: any) {
      console.error('☹ - Error Registering middlewares', error);
      process.exit(1);
    }
  }


  registerRouter(expressRouter: ExpressRouter | null): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (expressRouter) {
        console.log('📪 - Registering Routes...');
        console.log();
        this.app.use(expressRouter);
      }
      resolve();
    });
  }


  maintenanceMode(active: boolean = true) {
    this.app.set('maintenance', active);
  }
  log(active: boolean = true) {
    this.app.set('log', active);
  }

  generateAndRegisterRoutes(): Promise<Route[]> {
    return new Promise(async (resolve) => {
      const path = 'features/**/controller/**.controller.+(ts|js)';
      const cwd = process.cwd().replace(/\\/g, "/");

      const controllersFiles: FileGettedFromFolder[] = await getModulesGlob(path, { realpath: true, cwd: cwd });
      var expressRouter: ExpressRouter = express.Router();
      const allRoutes: Route[] = [];
      for await (const controllerFile of controllersFiles) {
        const controllerRoutes: Route[] = [];
        const _module = controllerFile.module.default as Controller;
        const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
        const jsdoc = controllerFile.content.match(jsDocRegex) || [];
        let controllerInfo: ControllerInfo = {};
        for await (const annotation of jsdoc) {
          let jsDocComment = doctrine.parse(annotation, { unwrap: true });
          if (jsDocComment.tags.find(x => x.title == 'api')) {
            controllerInfo = {
              info: {
                path:
                  jsDocComment.tags.find(x => x.title === 'api')!.description!, // route path
                description:
                  jsDocComment.tags.find(x => x.title === 'description')?.description || '', // path desc
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
        await this.registerRoutesOfController(controllerRoutes, expressRouter);
      }
      await this.registerRouter(expressRouter);
      resolve(allRoutes);
    });
  }

  registerRoutesOfController(routesOfController: Route[], expressRouter: ExpressRouter): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await Object.keys(routesOfController).forEach((key, index) => {
        const route: Route = routesOfController[index];
        if (route && route.controllerInfo && route.controllerInfo.controller) {
          const handler: expressRequestAndResponseType = route?.controllerInfo?.controller?.methods[index];
          if (route.method === 'get') expressRouter.get(`${route?.controllerInfo?.info?.path}${route.path}`, (req, res) => handler(req, res));
          if (route.method === 'post') expressRouter.post(`${route?.controllerInfo?.info?.path}${route.path}`, (req, res) => handler(req, res));
        }
      });
      resolve();
    });
  }
}

