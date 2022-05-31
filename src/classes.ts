import express = require('express');
export type ExpressRouter = express.Router;
export type expressRequestAndResponseType =
    (req: express.Request, res: express.Response) => void;
export type expressMiddlewareRequestAndResponseType =
    (req: express.Request, res: express.Response, next: express.NextFunction) => void;
// Controller Class

export abstract class Controller {
    getMethods: expressRequestAndResponseType[];
    postMethods: expressRequestAndResponseType[];
    constructor(getMethods: expressRequestAndResponseType[], postMethods: expressRequestAndResponseType[]) {
        this.getMethods = getMethods;
        this.postMethods = postMethods;
    }
}

// Router Classes

export type RouterSettings = {
    routes: Route[],
};
export abstract class Router {
    settings: RouterSettings | null = null;

    toExpressRouter(): Promise<ExpressRouter | null> {
        return new Promise(async (resolve) => {
            if (this.settings != null) {
                var expressRouter: ExpressRouter = express.Router();
                await this.settings.routes.forEach(async (route) => {
                    let baseRouterUrl = `/${route.path}/${route.version}`;
                    await Object.keys(route.handle.getMethods).forEach((key, index) => {
                        const getMethod: expressRequestAndResponseType = route.handle.getMethods[index];
                        const endpointName: string = `${baseRouterUrl}/${getMethod.name}`;
                        expressRouter.get(endpointName, (req, res) => getMethod(req, res));
                    });
                    await Object.keys(route.handle.postMethods).forEach((key, index) => {
                        const postMethod = route.handle.postMethods[index];
                        const endpointName: string = `${baseRouterUrl}/${postMethod.name}`;
                        expressRouter.post(endpointName, (req, res) => postMethod(req, res));
                    });
                });
                return resolve(expressRouter);
            }
            return resolve(null);
        });
    }
}

export abstract class Route {
    path: string;
    version: string;
    handle: Controller;

    constructor(path: string, version: string, handle: Controller) {
        this.path = path;
        this.version = version;
        this.handle = handle
    }

}

// Middleware Class

export abstract class Middleware {
    funcs: expressMiddlewareRequestAndResponseType[];
    path: string | null = null;
    constructor(funcs: expressMiddlewareRequestAndResponseType[], path: string) {
        this.funcs = funcs;
        this.path = path;
    }

    static fromFileGetted(file: FileGettedFromFolder): Middleware | null {
        if (file == null) return null;
        if (!file.content.default.hasOwnProperty('funcs')) return null;
        return file.content.default as Middleware;
    }
}

// File Readed

export class FileGettedFromFolder {
    name: string;
    content: any;

    constructor(name: string, content: any) {
        this.name = name;
        this.content = content;
    }
}