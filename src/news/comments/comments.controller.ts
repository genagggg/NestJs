import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentEdit, CommentsService } from './comments.service';
import { Comment } from './comments.service';
import { CreateCommentsDto } from './dtos/create-comments-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Post('/api/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: CreateCommentsDto) {
    const idNewsInt = parseInt(idNews);
    return this.CommentsService.create(idNewsInt, comment);
  }

  @Put('/api/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: CommentEdit,
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.CommentsService.edit(idNewsInt, idCommentInt, comment);
  }

  @Get('/api/details/:idNews')
  find(@Param('idNews') idNews: string) {
    const idNewsInt = parseInt(idNews);
    return this.CommentsService.find(idNewsInt);
  }

  @Delete('/api/details/:idNews/:idComments')
  remove(
    @Param('idNews') idNews: string,
    @Param('idComments') idComments: string,
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentsInt = parseInt(idComments);
    return this.CommentsService.remove(idNewsInt, idCommentsInt);
  }
}
