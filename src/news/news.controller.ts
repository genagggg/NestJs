import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { renderNewsDetail } from 'src/views/news/news-detail';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';

const PATH_NEWS ='/news-static/';
HelperFileLoader.path = PATH_NEWS;

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

  @Get('/detail/:id')
  getDetailView(@Param('id') id: string) {
    const inInt = parseInt(id);
    const news = this.newsService.find(inInt);
    const comment = this.commentService.find(inInt);
    const content = renderNewsDetail(news, comment);
    return renderTemplate(content, {
      title: news.title,
      description: news.description,
    });
  }

  @Post('/api')
  @UseInterceptors(
    FilesInterceptor('cover', 1,{
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(@Body() news: CreateNewsDto, @UploadedFile() cover: Express.Multer.File):News {
    let coverPath;
    if(cover[0]?.filename?.length > 0) {
    coverPath = PATH_NEWS + cover[0].filename;
    }
    return this.newsService.create({
    ...news,
    cover: coverPath,
    });
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: EditNewsDto): News {
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
    const content = renderNewsAll(news);
    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Самые крутые новости на свете',
    });
  }
}
