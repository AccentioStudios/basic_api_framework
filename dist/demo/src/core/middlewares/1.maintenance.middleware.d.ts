import { expressMiddlewareRequestAndResponseType, Middleware } from "@accentio/basic_api_framework/dist/classes";
declare class MaintenanceMiddleware implements Middleware {
    path: null;
    funcs: expressMiddlewareRequestAndResponseType[];
}
declare const _default: MaintenanceMiddleware;
export default _default;
