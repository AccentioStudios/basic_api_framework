import { RequestHandler } from 'express';
import { Middleware } from "@accentio/basic_api_framework/src/classes";

class TestMiddleware implements Middleware {
    path = null;
    funcs: RequestHandler[] = [
        (req, res, next) => {
            if (!req.app.get('testMessage')) {
                return next();
            }
            res.set({
                'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
            });
            res.writeHead(200, { 'content-type': 'text/html' });
            res.send('Hello World')
        }
    ];
}

export default new TestMiddleware();