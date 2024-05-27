import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
}