import { Model, Types } from 'mongoose';
interface CartEntity {
    userId: string;
    products: Types.Array<any>;
}
interface CartDto {
    userId: string;
    products: Types.Array<any>;
}
export declare function cartEntityToDto(user: CartEntity | null): CartDto | null;
declare const CartEntity: Model<CartEntity>;
export default CartEntity;
