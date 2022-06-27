"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGettedFromFolder = exports.Middleware = exports.Route = exports.Controller = void 0;
// Controller Class
class Controller {
    constructor(methods) {
        this.methods = methods;
    }
}
exports.Controller = Controller;
// Router Classes
class Route {
    constructor(path, method, controllerInfo, description) {
        this.path = path;
        this.method = method;
        this.controllerInfo = controllerInfo;
        this.description = description;
    }
}
exports.Route = Route;
// Middleware Class
class Middleware {
    constructor(funcs, callback, path) {
        this.path = null;
        this.funcs = funcs;
        this.callback = callback;
        this.path = path;
    }
    static fromFileGetted(file) {
        if (file == null)
            return null;
        if (!file.module.default.hasOwnProperty('funcs'))
            return null;
        return file.module.default;
    }
}
exports.Middleware = Middleware;
// File Readed
class FileGettedFromFolder {
    constructor(name, content, module, path) {
        this.name = name;
        this.content = content;
        this.module = module;
        this.path = path;
    }
}
exports.FileGettedFromFolder = FileGettedFromFolder;
