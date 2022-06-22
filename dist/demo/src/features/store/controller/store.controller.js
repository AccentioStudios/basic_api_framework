"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreController = /** @class */ (function () {
    function StoreController() {
        this.getMethods = [
            function login(req, res) {
                res.send('hello world');
            },
        ];
        this.postMethods = [];
    }
    return StoreController;
}());
exports.default = new StoreController;
