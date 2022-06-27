"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAsset_1 = require("../utils/getAsset");
const fs = require('fs');
const path = require('path');
class MaintenanceMiddleware {
    constructor() {
        this.path = null;
        this.funcs = [
            (req, res, next) => {
                if (!req.app.get('maintenance')) {
                    return next();
                }
                res.set({
                    'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
                });
                res.writeHead(503, { 'content-type': 'text/html' });
                fs.createReadStream((0, getAsset_1.getAsset)('maintenance.html')).pipe(res);
            }
        ];
    }
}
exports.default = new MaintenanceMiddleware();
