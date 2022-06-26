import YAML from 'yaml';
/**
 * Extracts the YAML description from JSDoc comments with `@swagger`/`@openapi` annotation.
 * @param {object} jsDocComment - Single item of JSDoc comments from doctrine.parse
 * @returns {array} YAML parts
 */
export function extractYamlFromJsDoc(jsDocComment) {
    const yamlParts = [];
    for (const tag of jsDocComment.tags) {
        if (tag.title === 'api' || tag.title === 'post' || tag.title === 'get' || tag.title === 'delete' || tag.title === 'patch') {
            const item = {};
            item[tag.title] = YAML.parse(tag.description);
            yamlParts.push(item);
        }
    }
    return yamlParts;
}
