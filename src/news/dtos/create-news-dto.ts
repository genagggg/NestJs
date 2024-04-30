import { IsNotEmpty } from "class-validator";


export class CreateNewsDto {
  @IsNotEmpty()
   title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: string;

  countView?: number;

  cover?: string;
}
