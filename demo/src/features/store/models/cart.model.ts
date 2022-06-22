import { Schema, model, Model, Types } from 'mongoose';

interface CartEntity {
    userId: string;
    products: Types.Array<any>;
}

interface CartDto {
    userId: string;
    products: Types.Array<any>;
}

export function cartEntityToDto(user: CartEntity | null): CartDto | null {
    if (user) {
        return {
            userId: user.userId,
            products: user.products
        } as CartDto
    }
    return null;
}

const schema = new Schema<CartEntity>({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
}, { timestamps: true });

const CartEntity: Model<CartEntity> = model<CartEntity>('Cart', schema);


export default CartEntity;
