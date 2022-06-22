import { Model, Types } from 'mongoose';
interface ProductEntity {
    title: string;
    description: string;
    img: string;
    categories: Types.Array<string>;
    sizes: Types.Array<string>;
    colors: Types.Array<string>;
    price: number;
}
interface ProductDto {
    title: string;
    description: string;
    img: string;
    categories: Types.Array<string>;
    sizes: Types.Array<string>;
    colors: Types.Array<string>;
    price: number;
}
declare const ProductEntity: Model<ProductEntity>;
export declare function productEntityToDto(user: ProductEntity | null): ProductDto | null;
export default ProductEntity;
