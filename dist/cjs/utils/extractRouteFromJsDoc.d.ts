import * as doctrine from 'doctrine';
import { Route } from '../classes';
/**
 * Extracts the Route description from JSDoc comments with `@api`/`@post`/ `@get`/ `@patch`/`@delete` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} Parts
 */
export declare function extractRouteFromJsDoc(jsDocComment: doctrine.Annotation): Route | null;
