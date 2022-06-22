"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = __importDefault(require("../controller/auth.controller"));
var AuthRoute = /** @class */ (function () {
    function AuthRoute() {
        this.path = 'auth';
        this.version = 'v1';
        this.handle = auth_controller_1.default;
    }
    return AuthRoute;
}());
exports.default = new AuthRoute;
