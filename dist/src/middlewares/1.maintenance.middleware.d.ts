import express = require('express');
import { Middleware } from "../classes";
declare class MaintenanceMiddleware implements Middleware {
    path: null;
    funcs: express.RequestHandler[];
}
declare const _default: MaintenanceMiddleware;
export default _default;
