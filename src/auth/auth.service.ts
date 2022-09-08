import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { LoginDto } from './dtos/login.dto';
import * as bc from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { password, ...result } = await this.usersService.findUserByUsername(
      loginDto.username,
    );

    const isPasswordMatch = await bc.compare(loginDto.password, password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    return result;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      uuid: user.uuid,
      role: user.role,
    };

    const { id, uuid, role, ...restUser } = user;
    const newUser = await this.usersService.findOne(uuid);

    return {
      accesToken: this.jwtService.sign(payload),
      user: newUser,
    };
  }
}
