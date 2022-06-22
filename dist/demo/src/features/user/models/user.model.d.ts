import { Model } from 'mongoose';
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
export declare function userEntityToDto(user: UserEntity | null): UserDto | null;
declare const UserEntity: Model<UserEntity>;
export default UserEntity;
