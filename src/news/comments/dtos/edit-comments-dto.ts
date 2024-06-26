import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class EditCommentDto {
    @IsString()
    @IsNotEmpty()
    @ValidateIf((o)=>o.message)
    message: string;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o)=>o.message)
    author: string;
}