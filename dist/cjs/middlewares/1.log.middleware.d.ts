import { RequestHandler } from 'express';
import { Middleware } from "../classes";
declare class LogMiddleware implements Middleware {
    path: null;
    funcs: RequestHandler[];
}
declare const _default: LogMiddleware;
export default _default;
