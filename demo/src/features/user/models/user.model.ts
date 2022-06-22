import { Schema, model, Model } from 'mongoose';

interface UserEntity {
    username: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

interface UserDto {
    username: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export function userEntityToDto(user: UserEntity | null): UserDto | null {
    if (user) {
        return {
            name: user.name,
            email: user.email
        } as UserDto
    }
    return null;
}

const schema = new Schema<UserEntity>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const UserEntity: Model<UserEntity> = model<UserEntity>('User', schema);


export default UserEntity;
