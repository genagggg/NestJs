import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { News, NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/:id')
  get(@Param('id') id: string): News {
    let idInt = parseInt(id);
    return this.newsService.find(idInt);
  }

  @Post()
  create(@Body() news: News) {
    return this.newsService.create(news);
  }
}
