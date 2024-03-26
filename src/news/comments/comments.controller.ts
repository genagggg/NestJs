import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly CommentsService: CommentsService){}

    @Post('/:idNews')
    create(@Param('idNews') idNews: string, @Body() comment: Comment){
        const idNewsInt = parseInt(idNews)
       return this.CommentsService.create(idNewsInt, comment)
    }
    
}
