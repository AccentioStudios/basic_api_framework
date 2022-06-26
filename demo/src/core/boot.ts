
import { ExpressApp } from "@accentio/basic_api_framework/src";
import { SwaggerIntegration } from "@accentio/basic_api_framework/src";
import { Database } from "../integrations/database";

const expressApp = new ExpressApp();
const database = new Database();

export default async function boot() {
  const routes = await expressApp.generateExpressRoutes();

  await expressApp.init();
  await expressApp.initMiddlewares();
  await expressApp.registerRouter(await expressApp.routesToExpressRouter(routes!));

  const swaggerIntegration = new SwaggerIntegration(swaggerDocs);
  swaggerIntegration.register(expressApp, routes!);

  // await database.init();
  await expressApp.maintenanceMode(false);
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