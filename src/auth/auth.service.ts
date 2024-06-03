import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from '../utils/crypto';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
constructor(
private readonly usersService: UsersService,
) {}
async validateUser(email: string, pass: string): Promise<UsersEntity|null> {
const _user = await this.usersService.findByEmail(email);
if (_user && (await compare(pass, _user.password))) {
return _user;
}
return null;
}
}

