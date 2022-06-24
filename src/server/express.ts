import express = require('express');
import { Controller, ControllerInfo, expressRequestAndResponseType, ExpressRouter, FileGettedFromFolder, Middleware, Route } from '../classes';
import { getModulesFromFolder, getModulesGlob } from '../utils/getModulesFromFolder';
import path = require('path');
import helmet from 'helmet';
import bodyParser = require('body-parser');
import * as doctrine from 'doctrine';
import { extractYamlFromJsDoc } from '../utils/extractYamlFromJsDoc';
import YAML from 'yaml'
import { extractRouteFromJsDoc } from '../utils/extractRouteFromJsDoc';
import { SwaggerIntegration } from '../core_integrations/swagger/swagger';

export class ExpressApp {
  app: express.Express;
  constructor() {
    this.app = express();
  }

  init(): Promise<express.Express> {
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
      const coreMiddlewaresFiles = await getModulesGlob('../middlewares/**.middleware.ts', { cwd: __dirname, realpath: true });
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
      const middlewaresFiles = await getModulesGlob('./src/core/middlewares/**.middleware.ts', { realpath: true });

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

  generateExpressRoutes(): Promise<Route[] | null> {
    return new Promise(async (resolve) => {
      const controllersFiles: FileGettedFromFolder[] = await getModulesGlob('./src/features/**/controller/**.controller.ts', { realpath: true });
      for await (const controllerFile of controllersFiles) {
        const _module = controllerFile.module.default as Controller;
        const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
        const jsdoc = controllerFile.content.match(jsDocRegex) || [];
        let controllerInfo: ControllerInfo = {};
        const routes: Route[] = [];
        for await (const annotation of jsdoc) {
          let jsDocComment = doctrine.parse(annotation, { unwrap: true });

          if (jsDocComment.tags[0].title === 'api') {
            controllerInfo = {
              info: {
                path: jsDocComment.tags[0].description, // route path
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

  routesToExpressRouter(routes: Route[]): Promise<ExpressRouter | null> {
    return new Promise(async (resolve, reject) => {
      var expressRouter: ExpressRouter = express.Router();

      await Object.keys(routes).forEach((key, index) => {
        const route: Route = routes[index];
        if (route && route.controllerInfo && route.controllerInfo.controller) {
          const handler: expressRequestAndResponseType = route?.controllerInfo?.controller?.methods[index];
          if (route.method === 'get') expressRouter.get(`${route?.controllerInfo?.info.path}${route.path}`, (req, res) => handler(req, res));
          if (route.method === 'post') expressRouter.post(`${route?.controllerInfo?.info.path}${route.path}`, (req, res) => handler(req, res));
        }
      });
      resolve(expressRouter);
    });
  }
}

