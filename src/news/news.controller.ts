import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { News, NewsEdit, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/api/detail/:id')
  get(@Param('id') id: string): News {
    const idInt = parseInt(id);
    const news = this.newsService.find(idInt);
    const comments = this.commentService.find(idInt);
    return {
      ...news,
      comments,
    };
  }

  @Get('/api/all')
  getAll(): News[] {
    const news = this.newsService.getAll();
    return news;
  }

  @Post('/api')
  create(@Body() news: News) {
    return this.newsService.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
    const idInt = parseInt(id);
    return this.newsService.edit(idInt, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoves = this.newsService.remove(idInt);
    return isRemoves ? 'Новость у далена' : 'Передан неверный индентификатор';
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAll();
    const content = renderNewsAll(news)
    return renderTemplate(content,{title:'Список новостей', description: 'Самые крутые новости на свете' })
  }
}
