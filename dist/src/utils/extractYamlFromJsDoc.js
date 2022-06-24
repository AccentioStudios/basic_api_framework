"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractYamlFromJsDoc = void 0;
var yaml_1 = __importDefault(require("yaml"));
/**
 * Extracts the YAML description from JSDoc comments with `@swagger`/`@openapi` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} YAML parts
 */
function extractYamlFromJsDoc(jsDocComment) {
    var yamlParts = [];
    for (var _i = 0, _a = jsDocComment.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        if (tag.title === 'api' || tag.title === 'post' || tag.title === 'get' || tag.title === 'delete' || tag.title === 'patch') {
            var item = {};
            item[tag.title] = yaml_1.default.parse(tag.description);
            yamlParts.push(item);
        }
    }
    return yamlParts;
}
exports.extractYamlFromJsDoc = extractYamlFromJsDoc;
