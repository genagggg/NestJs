import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from 'src/news/dtos/create-users-dto';
export type Users = {
    firstname: string
  };
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity)
    private usersRepositiry: Repository<UsersEntity>
){}

async create(user){
return this.usersRepositiry.save(user)
}

async findByEmail(email): Promise<UsersEntity>{
  return await this.usersRepositiry.findOne({
    where:[
    {email: email}]})
}
}
