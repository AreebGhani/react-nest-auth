import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: any, password: any): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
}
