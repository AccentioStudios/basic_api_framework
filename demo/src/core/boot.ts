
import { ExpressApp } from "@accentio/basic_api_framework/src/server/express";
import { SwaggerIntegration } from "../../../src/core_integrations/swagger/swagger";
import { Database } from "../integrations/database";

const expressApp = new ExpressApp();
const database = new Database();

async function boot() {
  const routes = await expressApp.generateExpressRoutes();

  await expressApp.init();
  await expressApp.initMiddlewares();
  await expressApp.registerRouter(await expressApp.routesToExpressRouter(routes!));
  await SwaggerIntegration.register(expressApp, routes!);
  // await database.init();


  await expressApp.maintenanceMode(false);
}

boot();