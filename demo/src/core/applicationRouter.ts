import { Router, RouterSettings } from "@accentio/basic_api_framework/dist/classes";
import authRoute from "../features/auth/router/auth.route";
import storeRoute from "../features/store/router/store.route";
import userRoute from "../features/user/router/user.route";

export class ApplicationRouter extends Router {
    settings: RouterSettings = {
        routes: [
            authRoute,
            userRoute,
            storeRoute,
        ]
    }
}