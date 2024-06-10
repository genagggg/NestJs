import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from '../utils/crypto';
import { UsersEntity } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
  ): Promise<UsersEntity | Object> {
    const _user = await this.usersService.findByEmail(email);
    if (await compare(pass, _user.password)) {
      const payload = { sub: _user.id, username: _user.firstName };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
     throw new UnauthorizedException();
  }
}
