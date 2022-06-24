"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGettedFromFolder = exports.Middleware = exports.Route = exports.Controller = void 0;
// Controller Class
var Controller = /** @class */ (function () {
    function Controller(methods) {
        this.methods = methods;
    }
    return Controller;
}());
exports.Controller = Controller;
// Router Classes
var Route = /** @class */ (function () {
    function Route(path, method, controllerInfo, description) {
        this.path = path;
        this.method = method;
        this.controllerInfo = controllerInfo;
        this.description = description;
    }
    return Route;
}());
exports.Route = Route;
// Middleware Class
var Middleware = /** @class */ (function () {
    function Middleware(funcs, callback, path) {
        this.path = null;
        this.funcs = funcs;
        this.callback = callback;
        this.path = path;
    }
    Middleware.fromFileGetted = function (file) {
        if (file == null)
            return null;
        if (!file.module.default.hasOwnProperty('funcs'))
            return null;
        return file.module.default;
    };
    return Middleware;
}());
exports.Middleware = Middleware;
// File Readed
var FileGettedFromFolder = /** @class */ (function () {
    function FileGettedFromFolder(name, content, module, path) {
        this.name = name;
        this.content = content;
        this.module = module;
        this.path = path;
    }
    return FileGettedFromFolder;
}());
exports.FileGettedFromFolder = FileGettedFromFolder;
