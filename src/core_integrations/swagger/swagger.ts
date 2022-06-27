
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
        let apis: SwaggerDoc = {
            tags: [],
            paths: {},
        };

        for (const route of routes) {
            if (route && route.path && route.method) {
                if (!apis.tags.find(x => x.name === route.controllerInfo?.info?.path)) {
                    apis.tags.push(
                        {
                            name: route.controllerInfo?.info?.path || '',
                            description: route.controllerInfo?.info?.description || '',
                        });
                }

                apis.paths[`${route.controllerInfo?.info?.path}${route.path}`] = {
                    [route.method]: {
                        tags: [
                            route.controllerInfo?.info?.path || ''
                        ],
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
        this.swaggerDocs['tags'] = apis.tags;
        this.swaggerDocs['paths'] = apis.paths;
        return this.swaggerDocs;
    }
}

type SwaggerDoc = {
    tags: SwaggerDocTags[],
    paths: any
}

type SwaggerDocTags = {
    name: string,
    description: string,
}
