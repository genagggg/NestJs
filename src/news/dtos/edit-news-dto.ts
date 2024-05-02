import { IsString, ValidateIf } from 'class-validator';

export class EditNewsDto {
  id: number;
  @ValidateIf((o) => o !== undefined)
  @IsString()
  title: string;
  @ValidateIf((o) => o !== undefined)
  description: string;
  @ValidateIf((o) => o !== undefined)
  author: string;
  @ValidateIf((o) => o !== undefined)
  countView: number;
  @ValidateIf((o) => o !== undefined)
  cover: string;
}
