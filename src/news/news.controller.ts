import { Controller, Get, Param } from '@nestjs/common';

@Controller('news')
export class NewsController {
    @Get('/:id')
    getNews(@Param('id')id:number):string{
        return `<h2 style="color: green">Новость №${id}</h2>`
    }
}
