"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderEntityToDto = void 0;
var mongoose_1 = require("mongoose");
function orderEntityToDto(user) {
    if (user) {
        return {
            userId: user.userId,
            products: user.products
        };
    }
    return null;
}
exports.orderEntityToDto = orderEntityToDto;
var schema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'pending' },
}, { timestamps: true });
var OrderEntity = (0, mongoose_1.model)('Order', schema);
exports.default = OrderEntity;
