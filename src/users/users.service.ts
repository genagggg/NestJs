import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
import { hash } from 'src/utils/crypto';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity)
    private usersRepositiry: Repository<UsersEntity>
){}

async create(user: CreateUserDto){
  const usersEntity = new UsersEntity();
  usersEntity.firstName = user.firstName;
  usersEntity.email = user.email
  usersEntity.password = await hash(user.password);
  usersEntity.roles = user.roles;
return this.usersRepositiry.save(usersEntity);
}

async findByEmail(email): Promise<UsersEntity>{
  return await this.usersRepositiry.findOne({
    where:[
    {email: email}]})
}

async findById(id): Promise<UsersEntity> {
  return this.usersRepositiry.findOne( {where: {id:id}} );
  }
  
}
