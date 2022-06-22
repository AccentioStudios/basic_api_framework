"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartEntityToDto = void 0;
var mongoose_1 = require("mongoose");
function cartEntityToDto(user) {
    if (user) {
        return {
            userId: user.userId,
            products: user.products
        };
    }
    return null;
}
exports.cartEntityToDto = cartEntityToDto;
var schema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
}, { timestamps: true });
var CartEntity = (0, mongoose_1.model)('Cart', schema);
exports.default = CartEntity;
