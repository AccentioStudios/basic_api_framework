import express = require('express');
import { ExpressRouter, FileGettedFromFolder } from '../classes';
export declare class ExpressApp {
    private app;
    constructor();
    init(): Promise<express.Express>;
    addMiddlewaresToExpress(middlewaresFiles: FileGettedFromFolder[]): Promise<void>;
    registerInternalMiddlewares(): Promise<void>;
    registerMiddlewares(): Promise<void>;
    registerRouter(expressRouter: ExpressRouter | null): Promise<void>;
    maintenanceMode(active?: boolean): void;
}
