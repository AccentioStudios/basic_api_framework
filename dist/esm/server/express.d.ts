import { Application } from 'express';
import { ExpressRouter, FileGettedFromFolder, Route } from '../classes';
export declare class ExpressApp {
    app: Application;
    constructor();
    init(): Promise<Application>;
    registerMiddlewares(middlewaresFiles: FileGettedFromFolder[]): Promise<void>;
    private registerInternalMiddlewares;
    initMiddlewares(): Promise<void>;
    registerRouter(expressRouter: ExpressRouter | null): Promise<void>;
    maintenanceMode(active?: boolean): void;
    generateAndRegisterRoutes(): Promise<Route[]>;
    registerRoutesOfController(routesOfController: Route[], expressRouter: ExpressRouter): Promise<void>;
}
