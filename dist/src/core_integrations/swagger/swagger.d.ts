import { Route } from '../../classes';
export declare abstract class SwaggerIntegration {
    static register(expressApp: any, routes: Route[]): Promise<void>;
    static generateOpenApi3(routes: Route[]): Promise<any>;
}
