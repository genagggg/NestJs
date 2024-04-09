import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Post('/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: Comment) {
    const idNewsInt = parseInt(idNews);
    return this.CommentsService.create(idNewsInt, comment);
  }

  @Get('/details/:idNews')
  find(@Param('idNews') idNews: string) {
    const idNewsInt = parseInt(idNews);
    return this.CommentsService.find(idNewsInt);
  }

  @Delete('/details/:idNews/:idComments')
  remove(
    @Param('idNews') idNews: string,
    @Param('idComments') idComments: string,
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentsInt = parseInt(idComments);
    return this.CommentsService.remove(idNewsInt, idCommentsInt);
    
  }
}
