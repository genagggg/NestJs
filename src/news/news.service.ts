import { Injectable } from '@nestjs/common';

export interface News {
  id: number;
  title: string;
  description: string;
  author: string;
  countView?: number;
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
    },
  ];

  create(news: News): News |undefined {
    this.news.push(news);
    return news;
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news) => {
      return news.id === id;
    });
  }
}
