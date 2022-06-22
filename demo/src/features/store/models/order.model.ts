import { Schema, model, Model, Types } from 'mongoose';
interface OrderEntity {
    userId: string;
    products: Types.Array<any>;
    amount: number;
    address: object;
    status: string;
}

interface OrderDto {
    userId: string;
    products: Types.Array<any>;
    amount: number;
    address: object;
    status: string;
}

export function orderEntityToDto(user: OrderEntity | null): OrderDto | null {
    if (user) {
        return {
            userId: user.userId,
            products: user.products
        } as OrderDto
    }
    return null;
}

const schema = new Schema<OrderEntity>({
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

const OrderEntity: Model<OrderEntity> = model<OrderEntity>('Order', schema);


export default OrderEntity;


