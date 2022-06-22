import { Schema, model, Model, Types } from 'mongoose';

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

const schema = new Schema<ProductEntity>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String], required: true },
    sizes: { type: [String] },
    colors: { type: [String] },
    price: { type: Number, required: true }
}, { timestamps: true });

const ProductEntity: Model<ProductEntity> = model<ProductEntity>('Product', schema);

export function productEntityToDto(user: ProductEntity | null): ProductDto | null {
    if (user) {
        return {
            title: user.title,
            description: user.description
        } as ProductDto
    }
    return null;
}

export default ProductEntity;
