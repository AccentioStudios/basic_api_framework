import * as swaggerUi from 'swagger-ui-express';
;
class SwaggerUIMiddleware {
    swaggerDocs = {};
    constructor(swaggerDocs) {
        this.swaggerDocs = swaggerDocs;
    }
    path = '/swagger';
    funcs = swaggerUi.serve;
    callback = [
        (res, req, next) => {
            const swaggerUiSetup = swaggerUi.setup(this.swaggerDocs);
            return swaggerUiSetup(res, req, next);
        }
    ];
}
export default SwaggerUIMiddleware;
