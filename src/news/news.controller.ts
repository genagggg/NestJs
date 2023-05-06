import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dtos/create-news-dto';
import { News, NewsEdit } from './news.interface';
import { CommentsService } from './comments/comments.service';
import { renderNewsDetail } from 'src/views/news/news-detail';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { MailService } from 'src/mail/mail.service';
import { NewsEntity } from './news.entity';

const PATH_NEWS = '/news-static/'
HelperFileLoader.path = PATH_NEWS

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService, private commentsService: CommentsService, private readonly mailService: MailService) { }
    @Get('/api/detail/:id')
    getNews(@Param('id') id: string): News {
        let idInt = parseInt(id)
        const news = this.newsService.find(idInt)
        const comments = this.commentsService.find(idInt)

        return {
            ...news,
            comments,
        }
    }

    @Get('/api/all')
    allNews(): News[] {
        return this.newsService.allNews()
    }

    @Put('/api/:id')
    edit(@Param('id') id: string, @Body() news: EditNewsDto): News {
        let idInt = parseInt(id)
        return this.newsService.edit(idInt, news)

    }

    @Delete('/api/:id')
    remove(@Param('id') id: string): string {
        const idInt = parseInt(id)
        const isRemoved = this.newsService.remove(idInt)
        return isRemoved ? 'Новость удалена' : 'Передан не верный индетификатор'
    }

    @Get('/all')
    @Render('news-list')
    getAllView() {
        const news = this.newsService.allNews()
        return { news, title: "Список новостей" }
    }

    @Get('/detail/:id')
    @Render('news-detail')
    getDetailViews(@Param('id') id: string) {
        const inInt = parseInt(id)
        const news = this.newsService.find(inInt)
        const comments = this.commentsService.find(inInt)
        return {
            news,
            comments
        }
    }

    @Post('/api')
    @UseInterceptors(
        FileInterceptor('cover', {
            storage: diskStorage({
                destination: HelperFileLoader.destinationPath,
                filename: HelperFileLoader.customFileName,
            }),
        }),
    )
    async create(
        @Body() news: CreateNewsDto,
        @UploadedFile() cover: Express.Multer.File): Promise<NewsEntity> {
        if (cover?.filename) {
            news.cover = PATH_NEWS + cover.filename
        }
        const createdNews = await this.newsService.create(news)

        return createdNews
    }

    @Get('create/new')
    @Render('create-news')
    async createView() {
        return {}
    }

}


