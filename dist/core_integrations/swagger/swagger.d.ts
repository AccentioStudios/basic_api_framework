import { Route } from '../../classes';
export declare class SwaggerIntegration {
    swaggerDocs: any;
    constructor(swaggerDocs: any);
    register(expressApp: any, routes: Route[]): Promise<void>;
    generateOpenApi3(routes: Route[]): Promise<any>;
}
