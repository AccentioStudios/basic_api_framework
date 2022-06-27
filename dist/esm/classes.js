// Controller Class
export class Controller {
    constructor(methods) {
        this.methods = methods;
    }
}
// Router Classes
export class Route {
    constructor(path, method, controllerInfo, description) {
        this.path = path;
        this.method = method;
        this.controllerInfo = controllerInfo;
        this.description = description;
    }
}
// Middleware Class
export class Middleware {
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
// File Readed
export class FileGettedFromFolder {
    constructor(name, content, module, path) {
        this.name = name;
        this.content = content;
        this.module = module;
        this.path = path;
    }
}
