import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Repository } from 'typeorm';
import { UserMySQL } from './entities/user.entity';
export declare class UserMySqlService {
    private usersRepository;
    constructor(usersRepository: Repository<UserMySQL>);
    findUsers(): Promise<UserMySQL[]>;
    findOneUser(id: number): Promise<UserMySQL>;
    createUser(createUserDto: CreateUserDto): Promise<CreateUserDto & UserMySQL>;
    updateUserData(userId: number, updateUserDtos: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUserData(userId: number): Promise<import("typeorm").DeleteResult>;
}
