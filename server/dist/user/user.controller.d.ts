/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(query: {
        page: number;
        limit: number;
    }): Promise<any>;
    findUser(_id: any): Promise<any>;
    findImg(_id: any, response: any): Promise<StreamableFile>;
    addUser(createUserDto: CreateUserDto): Promise<any>;
    updateUser(_id: any, updateUserDto: UpdateUserDto, img: Express.Multer.File): Promise<any>;
    deleteUser(_id: any): Promise<any>;
}
