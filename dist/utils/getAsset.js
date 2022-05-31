"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsset = void 0;
var path = require("path");
function getAsset(assetFileName) {
    return path.resolve(process.cwd(), "./assets/".concat(assetFileName));
}
exports.getAsset = getAsset;
