import { Controller, expressRequestAndResponseType } from "@accentio/basic_api_framework/src";
import UserEntity, { userEntityToDto } from "../models/user.model";

class UserController implements Controller {
    methods: expressRequestAndResponseType[] = [
        function world(req, res) {
            res.send('hello world');
        },
        async function testDB(req, res) {
            let user: UserEntity | null = await UserEntity.findOne();
            let userDto = userEntityToDto(user);
            res.send(JSON.stringify(userDto));
        }
    ];

}

export default new UserController;