import express from 'express';
export type ExpressRouter = express.Router;
export type expressRequestAndResponseType =
    (req: express.Request, res: express.Response) => void;
export type expressMiddlewareRequestAndResponseType =
    (req: express.Request, res: express.Response, next: express.NextFunction) => void;
// Controller Class

export abstract class Controller {
    methods: expressRequestAndResponseType[];
    constructor(methods: expressRequestAndResponseType[]) {
        this.methods = methods;
    }

}

// Router Classes
export abstract class Route {
    method?: string;
    path?: string;
    description?: string;
    controllerInfo?: ControllerInfo;

    constructor(path?: string, method?: string, controllerInfo?: ControllerInfo, description?: string,) {
        this.path = path;
        this.method = method;
        this.controllerInfo = controllerInfo;
        this.description = description;
    }
}

export type ControllerInfo = {
    controller?: Controller;
    info?: ControllerInfoInfo;
}
export type ControllerInfoInfo = {
    path: string, // route path
    description?: string // controller desc
}

// Middleware Class

export abstract class Middleware {
    funcs: express.RequestHandler[];
    callback?: express.RequestHandler[];
    path: string | null = null;
    constructor(funcs: express.RequestHandler[], callback: express.RequestHandler[], path: string) {
        this.funcs = funcs;
        this.callback = callback;
        this.path = path;
    }

    static fromFileGetted(file: FileGettedFromFolder): Middleware | null {
        if (file == null) return null;
        if (!file.module.default.hasOwnProperty('funcs')) return null;
        return file.module.default as Middleware;
    }
}

// File Readed

export class FileGettedFromFolder {
    name: string;
    content: string;
    module: any;
    path?: string;

    constructor(name: string, content: string, module: any, path?: string) {
        this.name = name;
        this.content = content;
        this.module = module;
        this.path = path;
    }
}