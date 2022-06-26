import express from 'express';
import { Middleware } from "../../classes";
import * as swaggerUi from 'swagger-ui-express';;

class SwaggerUIMiddleware implements Middleware {
    swaggerDocs: any = {};
    constructor(swaggerDocs: any) {
        this.swaggerDocs = swaggerDocs;
    }
    path = '/swagger';
    funcs: express.RequestHandler[] = swaggerUi.serve
    callback: express.RequestHandler[] = [
        (res, req, next) => {
            const swaggerUiSetup = swaggerUi.setup(this.swaggerDocs);
            return swaggerUiSetup(res, req, next);
        }
    ];
}

export default SwaggerUIMiddleware;