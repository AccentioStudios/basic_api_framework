import { RequestHandler } from 'express';
import { Middleware } from "../classes";
declare class MaintenanceMiddleware implements Middleware {
    path: null;
    funcs: RequestHandler[];
}
declare const _default: MaintenanceMiddleware;
export default _default;
//# sourceMappingURL=1.maintenance.middleware.d.ts.map