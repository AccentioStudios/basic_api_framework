import { Controller, expressRequestAndResponseType } from "@accentio/basic_api_framework/src/classes";

class StoreController implements Controller {
    methods: expressRequestAndResponseType[] = [
        function login(req, res) {
            res.send('hello world');
        },
    ];
    postMethods: expressRequestAndResponseType[] = [];

}

export default new StoreController;