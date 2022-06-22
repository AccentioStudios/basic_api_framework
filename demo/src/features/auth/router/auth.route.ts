import { Route } from '@accentio/basic_api_framework/dist/classes';
import authController from '../controller/auth.controller';

class AuthRoute implements Route {
    path = 'auth';
    version = 'v1';
    handle = authController;
}

export default new AuthRoute;
