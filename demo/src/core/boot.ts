import { ExpressApp } from "@accentio/basic_api_framework/dist/server/express";
import { Database } from "../integrations/database";
import { ApplicationRouter } from "./applicationRouter";

const expressApp = new ExpressApp();
const database = new Database();
const applicationRouter = new ApplicationRouter();

async function boot() {
  await expressApp.init();
  await expressApp.registerCoreMiddlewares();
  await expressApp.registerRouter(await applicationRouter.toExpressRouter());
  await database.init();

  await expressApp.maintenanceMode(false);
}

boot();