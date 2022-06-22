"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_controller_1 = __importDefault(require("../controller/store.controller"));
var StoreRoute = /** @class */ (function () {
    function StoreRoute() {
        this.path = 'store';
        this.version = 'v1';
        this.handle = store_controller_1.default;
    }
    return StoreRoute;
}());
exports.default = new StoreRoute;
