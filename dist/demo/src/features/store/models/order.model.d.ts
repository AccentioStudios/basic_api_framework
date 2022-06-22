import { Model, Types } from 'mongoose';
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
export declare function orderEntityToDto(user: OrderEntity | null): OrderDto | null;
declare const OrderEntity: Model<OrderEntity>;
export default OrderEntity;
