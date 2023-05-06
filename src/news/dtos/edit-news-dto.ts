
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class EditNewsDto {
    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.message)

    message: string;

    @ValidateIf((o) => o.author)
    author: string;
}