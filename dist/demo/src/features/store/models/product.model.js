"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productEntityToDto = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String], required: true },
    sizes: { type: [String] },
    colors: { type: [String] },
    price: { type: Number, required: true }
}, { timestamps: true });
var ProductEntity = (0, mongoose_1.model)('Product', schema);
function productEntityToDto(user) {
    if (user) {
        return {
            title: user.title,
            description: user.description
        };
    }
    return null;
}
exports.productEntityToDto = productEntityToDto;
exports.default = ProductEntity;
