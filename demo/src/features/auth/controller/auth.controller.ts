import { Controller, expressRequestAndResponseType } from "@accentio/basic_api_framework/src";
import UserEntity, { userEntityToDto } from "../../user/models/user.model";
import bcrypt from 'bcrypt';

/**
 * @api /auth
 * @name Authentication
 */
class AuthController implements Controller {
    methods: expressRequestAndResponseType[] = [

        /**
        * @get /v1/login
        * @description Authentication Login
        */
        function login(req, res) {
            res.send('hello world');
        },

        /**
        * @post /v1/register
        * @description Authentication Register
        */
        async function register(req, res) {
            try {
                const newUser = new UserEntity({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: await bcryptPassword(req.body.password),
                });
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