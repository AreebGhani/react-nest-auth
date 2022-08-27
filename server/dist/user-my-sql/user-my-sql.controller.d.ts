import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserMySqlService } from './user-my-sql.service';
export declare class UserMySqlController {
    private userMySqlService;
    constructor(userMySqlService: UserMySqlService);
    getUsers(): Promise<import("./entities/user.entity").UserMySQL[]>;
    findUser(userId: number): Promise<import("./entities/user.entity").UserMySQL>;
    addUser(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").UserMySQL>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(userId: number): Promise<import("typeorm").DeleteResult>;
}
