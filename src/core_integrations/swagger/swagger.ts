import { Route } from '../../classes';
import SwaggerUIMiddleware from './swaggerui.middleware';

export class SwaggerIntegration {
    swaggerDocs: any;
    constructor(swaggerDocs: any) {
        this.swaggerDocs = swaggerDocs;
    }

    async register(expressApp: any, routes: Route[]) {
        try {
            const middleware = new SwaggerUIMiddleware(await this.generateOpenApi3(routes));

            if (middleware) {
                await expressApp.app.use(middleware.path, middleware.funcs, middleware.callback);
            }
        } catch (error: any) {
            console.error('Error registering Swagger Integration', error);
        }
    }

    async generateOpenApi3(routes: Route[]): Promise<any> {
        let apis: any = {
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
                }
            }
        }
        this.swaggerDocs['paths'] = apis.paths
        return this.swaggerDocs;
    }
}