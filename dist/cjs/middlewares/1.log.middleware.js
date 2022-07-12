"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
class LogMiddleware {
    constructor() {
        this.path = null;
        this.funcs = [
            (req, res, next) => {
                if (!req.app.get('log')) {
                    return next();
                }
                console.log(`${req.method}: ${req.path}`, req.body, req.params);
                next();
            }
        ];
    }
}
exports.default = new LogMiddleware();
