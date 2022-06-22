import express = require('express');
export declare type ExpressRouter = express.Router;
export declare type expressRequestAndResponseType = (req: express.Request, res: express.Response) => void;
export declare type expressMiddlewareRequestAndResponseType = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare abstract class Controller {
    getMethods: expressRequestAndResponseType[];
    postMethods: expressRequestAndResponseType[];
    constructor(getMethods: expressRequestAndResponseType[], postMethods: expressRequestAndResponseType[]);
}
export declare type RouterSettings = {
    routes: Route[];
};
export declare abstract class Router {
    settings: RouterSettings | null;
    toExpressRouter(): Promise<ExpressRouter | null>;
}
export declare abstract class Route {
    path: string;
    version: string;
    handle: Controller;
    constructor(path: string, version: string, handle: Controller);
}
export declare abstract class Middleware {
    funcs: expressMiddlewareRequestAndResponseType[];
    path: string | null;
    constructor(funcs: expressMiddlewareRequestAndResponseType[], path: string);
    static fromFileGetted(file: FileGettedFromFolder): Middleware | null;
}
export declare class FileGettedFromFolder {
    name: string;
    content: any;
    constructor(name: string, content: any);
}
