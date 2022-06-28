import { RequestHandler } from 'express';
import { Middleware } from "../classes";
import { getAsset } from "../utils/getAsset";

const fs = require('fs');
const path = require('path');

class LogMiddleware implements Middleware {
    path = null;
    funcs: RequestHandler[] = [
        (req, res, next) => {
            if (!req.app.get('log')) {
                return next();
            }
            console.log(`${req.method}: ${req.path}`, req.body, req.params);
            next();
        }
    ];
}

export default new LogMiddleware();