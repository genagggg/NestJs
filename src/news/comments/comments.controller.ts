import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    
    
    @Get('/:idNews')
    find(@Param("idNews") idNews: string){
        const idNewsInt = parseInt(idNews)
        return this.CommentsService.find(idNewsInt)
    }
}
