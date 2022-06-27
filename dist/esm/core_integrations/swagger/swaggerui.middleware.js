import * as swaggerUi from 'swagger-ui-express';
;
class SwaggerUIMiddleware {
    constructor(swaggerDocs) {
        this.swaggerDocs = {};
        this.path = '/swagger';
        this.funcs = swaggerUi.serve;
        this.callback = [
            (res, req, next) => {
                const swaggerUiSetup = swaggerUi.setup(this.swaggerDocs);
                return swaggerUiSetup(res, req, next);
            }
        ];
        this.swaggerDocs = swaggerDocs;
    }
}
export default SwaggerUIMiddleware;
