"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
var classes_1 = require("@accentio/basic_api_framework/dist/classes");
var auth_route_1 = __importDefault(require("../features/auth/router/auth.route"));
var store_route_1 = __importDefault(require("../features/store/router/store.route"));
var user_route_1 = __importDefault(require("../features/user/router/user.route"));
var ApplicationRouter = /** @class */ (function (_super) {
    __extends(ApplicationRouter, _super);
    function ApplicationRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.settings = {
            routes: [
                auth_route_1.default,
                user_route_1.default,
                store_route_1.default,
            ]
        };
        return _this;
    }
    return ApplicationRouter;
}(classes_1.Router));
exports.ApplicationRouter = ApplicationRouter;
