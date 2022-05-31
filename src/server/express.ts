import express = require('express');
import { ExpressRouter, Middleware } from '../classes';
import { getFilesFolder } from '../utils/getFilesFolder';
import path = require('path');
import helmet from 'helmet';
import bodyParser = require('body-parser');
export class ExpressApp {
  private app: express.Express;
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

  registerCoreMiddlewares(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const middlewaresFiles = await getFilesFolder(path.resolve(process.cwd(), './lib/core/middlewares'), 'ts', ['index']);
      console.log('🐵 - Registering middlewares...');
      console.log();
      await middlewaresFiles.forEach(async (middlewaresFile) => {
        const middleware = Middleware.fromFileGetted(middlewaresFile);
        if (middleware) {
          if (middleware.path !== null && middleware.path !== '' && middleware.path !== undefined) {
            this.app.use(middleware.path, await middleware.funcs);
          } else {
            this.app.use(await middleware.funcs);
          }
        }
      });
      resolve();
    });
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
}

