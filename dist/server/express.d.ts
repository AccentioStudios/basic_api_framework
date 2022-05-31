import express = require('express');
import { ExpressRouter } from '../classes';
export declare class ExpressApp {
    private app;
    constructor();
    init(): Promise<express.Express>;
    registerCoreMiddlewares(): Promise<void>;
    registerRouter(expressRouter: ExpressRouter | null): Promise<void>;
    maintenanceMode(active?: boolean): void;
}
