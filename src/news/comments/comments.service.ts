import { Injectable } from '@nestjs/common';
//import { getRandomInt } from '../news.service';

export type Comment = {
  id?: number;
  message: string;
  author: string;
};

export type CommentEdit = {
  id?: number;
  message?: string;
  author?: string;
}

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: number, comment: Comment) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push({
      ...comment,
     // id: getRandomInt(),
    });
    console.log(this.comments)
    return `Комментарий был создан${this.comments}`;
  }

  edit(idNews: number, idComment: number, comment: CommentEdit){
    const indexComment = this.comments[idNews].findIndex((c)=> c.id === idComment)
if(!this.comments[idNews] || indexComment === -1){
  return false
}
this.comments[idNews][indexComment] = {
  ...this.comments[idNews][idComment],
  ...comment,
}
return this.comments[idNews][indexComment]
  }

  find(idNews: number): Comment[] | null {
    return this.comments[idNews] || null;
  }

  remove(idNews: number, idComments: number) {
    if (!this.comments[idNews]) {
      return null;
    }

    const indexComment = this.comments[idNews].findIndex(
      (c) => c.id === idComments,
    );
    if (indexComment === -1) {
      return null;
    }

    this.comments[idNews].splice(indexComment, 1);
    return 'Коментарий был удалён';
  }
}
