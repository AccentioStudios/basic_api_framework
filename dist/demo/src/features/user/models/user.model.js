"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntityToDto = void 0;
var mongoose_1 = require("mongoose");
function userEntityToDto(user) {
    if (user) {
        return {
            name: user.name,
            email: user.email
        };
    }
    return null;
}
exports.userEntityToDto = userEntityToDto;
var schema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true });
var UserEntity = (0, mongoose_1.model)('User', schema);
exports.default = UserEntity;
