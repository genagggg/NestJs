import { Injectable } from '@nestjs/common';
import { getRandomInt } from '../news.service';

export type Comment = {
  id?: number;
  message: string;
  author: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: number, comment: Comment) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push({
      ...comment,
      id: getRandomInt(),
    });
    return 'Комментарий был создан';
  }

  find(idNews: number): Comment[] | undefined {
    return this.comments[idNews] || undefined;
  }
}
