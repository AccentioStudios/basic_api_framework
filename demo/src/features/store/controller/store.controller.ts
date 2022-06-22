import { Controller, expressRequestAndResponseType } from "@accentio/basic_api_framework/dist/classes";

class StoreController implements Controller {
    getMethods: expressRequestAndResponseType[] = [
        function login(req, res) {
            res.send('hello world');
        },
    ];
    postMethods: expressRequestAndResponseType[] = [];

}

export default new StoreController;