import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment, CommentEdit } from './comments.interface';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post('/api/:idNews')
    create(@Param('idNews') idNews: string, @Body() comment: CreateCommentDto) {
        const idNewsInt = parseInt(idNews);
        return this.commentsService.create(idNewsInt, comment)
    }

    @Put('/api/:idNews/:idComment')
    edit(
        @Param('idNews') idNews: string,
        @Param('idComment') idComment: string,
        @Body() comment: EditCommentDto) {

        const idNewsInt = parseInt(idNews);
        const idCommentInt = parseInt(idComment)
        return this.commentsService.edit(idNewsInt, idCommentInt, comment)
    }

    @Get('/api/details/:idNews')
    get(@Param('idNews') idNews: string) {
        const idNewsInt = parseInt(idNews)
        return this.commentsService.find(idNewsInt)
    }

    @Delete('/api/details/:idNews/:idComment')
    remove(@Param('idNews') idNews: string,
        @Param('idComments') idComment: string) {

        const idNewsInt = parseInt(idNews)
        const idCommentInt = parseInt(idComment)
        return this.commentsService.remove(idNewsInt, idCommentInt)
    }
}
