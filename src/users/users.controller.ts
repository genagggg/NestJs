import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from 'src/news/dtos/create-users-dto';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post('/api')
    async create(@Body() users: CreateUsersDto):Promise<UsersEntity>{
        return await this.usersService.create(users)
    }
}
