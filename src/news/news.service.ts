import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  cover?: string;
  comments?: Comment[];
}

export interface NewsEdit {
  id: number;
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
  
}

@Injectable()
export class NewsService {
  constructor(  @InjectRepository(NewsEntity)
  private newsRepository: Repository<NewsEntity>,){}

  async create(news: News):Promise<NewsEntity> {
  return await this.newsRepository.save(news)
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
