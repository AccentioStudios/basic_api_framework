"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRouteFromJsDoc = void 0;
/**
 * Extracts the Route description from JSDoc comments with `@api`/`@post`/ `@get`/ `@patch`/`@delete` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} Parts
 */
function extractRouteFromJsDoc(jsDocComment) {
    var _a, _b;
    let route;
    if (jsDocComment.tags[0].title === 'post' ||
        jsDocComment.tags[0].title === 'get' ||
        jsDocComment.tags[0].title === 'delete' ||
        jsDocComment.tags[0].title === 'patch') {
        route = {
            method: jsDocComment.tags[0].title,
            path: ((_a = jsDocComment.tags[0]) === null || _a === void 0 ? void 0 : _a.description) || '',
            description: ((_b = jsDocComment.tags[1]) === null || _b === void 0 ? void 0 : _b.description) || ''
        };
        return route;
    }
    return null;
}
exports.extractRouteFromJsDoc = extractRouteFromJsDoc;
