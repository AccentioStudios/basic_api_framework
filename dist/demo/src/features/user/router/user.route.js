"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = __importDefault(require("../controller/user.controller"));
var UserRoute = /** @class */ (function () {
    function UserRoute() {
        this.path = 'user';
        this.version = 'v1';
        this.handle = user_controller_1.default;
    }
    return UserRoute;
}());
exports.default = new UserRoute;
