import { Route } from '@accentio/basic_api_framework/dist/classes';
import userController from '../controller/user.controller';

class UserRoute implements Route {
    path = 'user';
    version = 'v1';
    handle = userController;
}

export default new UserRoute;
