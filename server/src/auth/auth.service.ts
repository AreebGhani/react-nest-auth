import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: any, password: any) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (user.password === password) {
        return user;
      } else {
        throw new BadRequestException({
          error: 'password',
          message: 'incorrect password',
          password: password,
        });
      }
    } else {
      throw new BadRequestException({
        error: 'email',
        message: 'email not found',
        email: email,
      });
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
