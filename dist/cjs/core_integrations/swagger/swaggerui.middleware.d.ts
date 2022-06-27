import express from 'express';
import { Middleware } from "../../classes";
declare class SwaggerUIMiddleware implements Middleware {
    swaggerDocs: any;
    constructor(swaggerDocs: any);
    path: string;
    funcs: express.RequestHandler[];
    callback: express.RequestHandler[];
}
export default SwaggerUIMiddleware;
