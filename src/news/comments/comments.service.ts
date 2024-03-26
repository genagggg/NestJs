import { Injectable } from '@nestjs/common';

export type Comment = {
  id?: number;
  message: string;
  author: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {
    1: [],
    66271: [{ id: 1, message: 'Сообщение', author: 'Vlad' }],
  };

  create(idNews: number, comment: Comment) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push(comment);
    return comment
  }

  find(idNews: number): Comment[] | undefined{
return this.comments[idNews] || undefined
  }
}
