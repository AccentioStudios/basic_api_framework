
import { ExpressApp } from "@accentio/basic_api_framework/src";
import { SwaggerIntegration } from "@accentio/basic_api_framework/src";
import { Database } from "../integrations/database";

const expressApp = new ExpressApp();
const database = new Database();

export default async function boot() {

  await expressApp.init();
  await expressApp.initMiddlewares();
  const routes = await expressApp.generateAndRegisterRoutes();

  const swaggerIntegration = new SwaggerIntegration(swaggerDocs);
  swaggerIntegration.register(expressApp, routes!);

  // await database.init();
  expressApp.maintenanceMode(false);
  expressApp.log(true);
}

let swaggerDocs: any = {
  openapi: '3.0.0',
  info: {
    title: 'Demo Basic Api Framework',
    version: '1.0.0',
    description: 'My Api Description',
    contact: {
      name: 'Accentio Studios',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Server'
      }
    ]
  }
}

// boot();