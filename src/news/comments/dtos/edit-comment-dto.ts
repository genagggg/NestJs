
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class EditCommentDto {
    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.title)

    title: string;

    @ValidateIf(o => o !== undefined)
    description: string;

    @ValidateIf(o => o !== undefined)
    author: string;

    @ValidateIf(o => o !== undefined)
    countView: number;

    @ValidateIf(o => o !== undefined)
    cover: string;
}