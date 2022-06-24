import express = require('express');
export declare type ExpressRouter = express.Router;
export declare type expressRequestAndResponseType = (req: express.Request, res: express.Response) => void;
export declare type expressMiddlewareRequestAndResponseType = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare abstract class Controller {
    methods: expressRequestAndResponseType[];
    constructor(methods: expressRequestAndResponseType[]);
}
export declare abstract class Route {
    method?: string;
    path?: string;
    description?: string;
    controllerInfo?: ControllerInfo;
    constructor(path?: string, method?: string, controllerInfo?: ControllerInfo, description?: string);
}
export declare type ControllerInfo = {
    controller?: Controller;
    info?: any;
};
export declare abstract class Middleware {
    funcs: express.RequestHandler[];
    callback?: express.RequestHandler[];
    path: string | null;
    constructor(funcs: express.RequestHandler[], callback: express.RequestHandler[], path: string);
    static fromFileGetted(file: FileGettedFromFolder): Middleware | null;
}
export declare class FileGettedFromFolder {
    name: string;
    content: string;
    module: any;
    path?: string;
    constructor(name: string, content: string, module: any, path?: string);
}
