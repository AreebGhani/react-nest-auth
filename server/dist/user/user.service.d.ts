import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUsers(query: {
        page: number;
        limit: number;
    }): Promise<any>;
    findOneUser(_id: any): Promise<any>;
    findByEmail(email: any): Promise<any>;
    createUser(createUserDto: CreateUserDto): Promise<any>;
    updateUserData(_id: any, updateUserDtos: UpdateUserDto): Promise<any>;
    deleteUserData(_id: any): Promise<any>;
}
