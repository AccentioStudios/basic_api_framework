import { Route } from '../../classes';
import SwaggerUIMiddleware from './swaggerui.middleware';

let swaggerDocs: any = {
    openapi: '3.0.0',
    info: {
        title: 'My Api',
        version: '1.0.0',
        description: 'My Api Description',
        contact: {
            name: 'Accentio Studios',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Server'
            }
        ]
    }
}

export abstract class SwaggerIntegration {

    static async register(expressApp: any, routes: Route[]) {
        try {
            const middleware = new SwaggerUIMiddleware(await this.generateOpenApi3(routes));

            if (middleware) {
                await expressApp.app.use(middleware.path, middleware.funcs, middleware.callback);
            }
        } catch (error: any) {
            console.error('Error registering Swagger Integration', error);
        }
    }

    static async generateOpenApi3(routes: Route[]) {
        let apis: any = {
            paths: {}
        };

        for (const route of routes) {
            if (route && route.path && route.method) {
                apis.paths[route.path] = {
                    [route.method]: {
                        summary: route.description,
                        responses: {
                            200: {
                                description: 'OK Example'
                            }
                        }
                    }
                }
            }
        }
        swaggerDocs['paths'] = apis.paths
        return swaggerDocs;
    }
}