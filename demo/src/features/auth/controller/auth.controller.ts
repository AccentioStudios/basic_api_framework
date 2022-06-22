import { Controller, expressRequestAndResponseType } from "@accentio/basic_api_framework/dist/classes";
import UserEntity, { userEntityToDto } from "../../user/models/user.model";
import bcrypt = require('bcrypt');

class AuthController implements Controller {
    getMethods: expressRequestAndResponseType[] = [
    ];
    postMethods: expressRequestAndResponseType[] = [
        function login(req, res) {
            res.send('hello world');
        },
        async function register(req, res) {
            const newUser = new UserEntity({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: await bcryptPassword(req.body.password),
            });
            try {
                const savedUser: UserEntity = await newUser.save();
                res.status(201).json(userEntityToDto(savedUser));
            } catch (err) {
                console.error(err);
                res.status(500).send("Error");
            }
        }
    ];

}

async function bcryptPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
}

function comparePassword(plainPassword: string, password: string) {
    return bcrypt.compare(plainPassword, password);
}

export default new AuthController;