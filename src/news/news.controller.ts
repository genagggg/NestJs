import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  UploadedFile,
  UseGuards,
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
import { NewsEntity } from './news.entity';
import { AuthGuard } from 'src/auth/auth.guard';

const PATH_NEWS ='/news-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/api/detail/:id')
  async get(@Param('id') id: string) {
    const idInt = parseInt(id);
    return await this.newsService.find(idInt);
  }

  @UseGuards(AuthGuard)
  @Get('/api/all')
  getAll() {
    return this.newsService.getAll();
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
  async create(@Body() news: CreateNewsDto):Promise<NewsEntity> {
   
    return await this.newsService.create(news);
  }

  @Put('/api/:id')
  async edit(@Param('id') id: string, @Body() news: EditNewsDto) {
    const idInt = parseInt(id);
    return await this.newsService.edit(idInt, news);
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string) {
    const idInt = parseInt(id);
    const isRemoves = this.newsService.remove(idInt);
    return await isRemoves ? 'Новость удалена' : 'Передан неверный индентификатор';
  }

  @Get('/hbs')
  @Render('index')
  root(){
    return {
      messages:[{message: 'myau', author: 'Bob Dilan'},
    {message: 'ttt', author: 'Bo lan'},
    {message: 'kkk', author: 'Bo Di'},
    ],
    name: 'Kolya'
  }
  }
}
