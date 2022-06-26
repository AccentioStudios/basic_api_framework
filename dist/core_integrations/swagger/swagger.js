import SwaggerUIMiddleware from './swaggerui.middleware';
export class SwaggerIntegration {
    swaggerDocs;
    constructor(swaggerDocs) {
        this.swaggerDocs = swaggerDocs;
    }
    async register(expressApp, routes) {
        try {
            const middleware = new SwaggerUIMiddleware(await this.generateOpenApi3(routes));
            if (middleware) {
                await expressApp.app.use(middleware.path, middleware.funcs, middleware.callback);
            }
        }
        catch (error) {
            console.error('Error registering Swagger Integration', error);
        }
    }
    async generateOpenApi3(routes) {
        let apis = {
            paths: {}
        };
        for (const route of routes) {
            if (route && route.path && route.method) {
                apis.paths[`${route.controllerInfo?.info.path}${route.path}`] = {
                    [route.method]: {
                        summary: route.description,
                        responses: {
                            200: {
                                description: 'OK Example'
                            }
                        }
                    }
                };
            }
        }
        this.swaggerDocs['paths'] = apis.paths;
        return this.swaggerDocs;
    }
}
