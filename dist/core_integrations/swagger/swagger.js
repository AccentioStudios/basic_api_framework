"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
var path_1 = __importDefault(require("path"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My Api',
            version: '1.0.0',
            description: 'My Api Description',
            contact: {
                name: 'Accentio Studios',
            },
            servers: [
                "https://localhost:5000"
            ]
        }
    },
    apis: __spreadArray([], generateSwaggerDocumentation(), true)
};
var swaggerDocs = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
function generateSwaggerDocumentation() {
    var controllerFolder = path_1.default.resolve(process.cwd(), './src/features/') + '/**/*.controller.ts';
    return [
        controllerFolder
    ];
}
