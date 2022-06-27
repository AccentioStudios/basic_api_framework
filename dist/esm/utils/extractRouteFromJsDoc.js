/**
 * Extracts the Route description from JSDoc comments with `@api`/`@post`/ `@get`/ `@patch`/`@delete` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} Parts
 */
export function extractRouteFromJsDoc(jsDocComment) {
    let route;
    if (jsDocComment.tags[0].title === 'post' ||
        jsDocComment.tags[0].title === 'get' ||
        jsDocComment.tags[0].title === 'delete' ||
        jsDocComment.tags[0].title === 'patch') {
        route = {
            method: jsDocComment.tags[0].title,
            path: jsDocComment.tags[0].description || '',
            description: jsDocComment.tags[1].description || ''
        };
        return route;
    }
    return null;
}
