import { IsString, IsNumber } from 'class-validator';

export class CreateEditDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  author: string;
  @IsNumber()
  countView?: number;
  @IsNumber()
  cover?: string;
}
