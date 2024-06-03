import { IsEnum } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role/role.enum';
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  firstName: string;
  @Column('text')
  email: string;
  @Column('text')
  password: string;
  @Column('text')
  @IsEnum(Role)
  roles: Role;
}