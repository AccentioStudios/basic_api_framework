"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractYamlFromJsDoc = void 0;
const yaml_1 = __importDefault(require("yaml"));
/**
 * Extracts the YAML description from JSDoc comments with `@swagger`/`@openapi` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} YAML parts
 */
function extractYamlFromJsDoc(jsDocComment) {
    const yamlParts = [];
    for (const tag of jsDocComment.tags) {
        if (tag.title === 'api' || tag.title === 'post' || tag.title === 'get' || tag.title === 'delete' || tag.title === 'patch') {
            yamlParts.push({
                [tag.title]: yaml_1.default.parse(tag.description)
            });
        }
    }
    return yamlParts;
}
exports.extractYamlFromJsDoc = extractYamlFromJsDoc;
