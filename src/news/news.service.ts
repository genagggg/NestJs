import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';

export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  comments?: Comment[];
}

export interface NewsEdit {
  id: number;
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'Новость про котов',
      description: 'Коты милые',
      author: 'GG',
      countView: 7,
      comments: []
    },
  ];

  create(news: News): News | undefined {
    const id = getRandomInt(0, 99999);
    console.log(id);
    const finalNews = {
      ...news,
      id: id,
    };
    console.log(id);
    this.news.push(finalNews);
    return finalNews;
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news) => {
      return news.id === id;
    });
  }

  getAll():News[]{
    return this.news
  }

  remove(id: News['id']): boolean {
    const indexRemoveNews = this.news.findIndex((news) => news.id === id);
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    }
    return false;
  }

  edit(id: number, news: NewsEdit): News | undefined {
    const indexEditNews = this.news.findIndex((news) => news.id === id);

    if (indexEditNews !== -1) {
      this.news[indexEditNews] = {
        ...this.news[indexEditNews],
        ...news,
      };
      return this.news[indexEditNews];
    }
    return undefined
  }
}
