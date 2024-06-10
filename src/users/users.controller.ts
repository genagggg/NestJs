import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post('/api')
    async create(@Body() users: CreateUserDto):Promise<UsersEntity>{
        return await this.usersService.create(users)
    }
}
