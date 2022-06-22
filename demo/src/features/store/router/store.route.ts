import { Route } from '@accentio/basic_api_framework/dist/classes';
import storeController from '../controller/store.controller';

class StoreRoute implements Route {
    path = 'store';
    version = 'v1';
    handle = storeController;
}

export default new StoreRoute;
