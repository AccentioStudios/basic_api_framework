import express = require('express');
import { Middleware } from "../classes";
declare class SwaggerUIMiddleware implements Middleware {
    path: string;
    funcs: express.RequestHandler[];
    callback: express.RequestHandler[];
}
declare const _default: SwaggerUIMiddleware;
export default _default;
