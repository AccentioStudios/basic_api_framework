"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAsset_1 = require("../utils/getAsset");
var fs = require('fs');
var path = require('path');
var MaintenanceMiddleware = /** @class */ (function () {
    function MaintenanceMiddleware() {
        this.path = null;
        this.funcs = [
            function (req, res, next) {
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
    return MaintenanceMiddleware;
}());
exports.default = new MaintenanceMiddleware();
