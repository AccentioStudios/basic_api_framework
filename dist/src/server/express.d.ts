import express = require('express');
import { ExpressRouter, FileGettedFromFolder, Route } from '../classes';
export declare class ExpressApp {
    app: express.Express;
    constructor();
    init(): Promise<express.Express>;
    registerMiddlewares(middlewaresFiles: FileGettedFromFolder[]): Promise<void>;
    private registerInternalMiddlewares;
    initMiddlewares(): Promise<void>;
    registerRouter(expressRouter: ExpressRouter | null): Promise<void>;
    maintenanceMode(active?: boolean): void;
    generateExpressRoutes(): Promise<Route[] | null>;
    routesToExpressRouter(routes: Route[]): Promise<ExpressRouter | null>;
}
