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

  async find(id: News['id']) {
    return await this.newsRepository.findBy({id: id})
  }

  async getAllAuthor():Promise<NewsEntity[]>{
    return await this.newsRepository.find({
      // select:{
      //   author: true
      // }
      take: 10
    })
  }

  async remove(id: News['id']) {
    const findId = await this.newsRepository.findBy({id:id})
    console.log(findId)
     if (findId.length !== 0) {
      this.newsRepository.delete({id: id})
      return await true;
    }
    return await false;
  }

  // edit(id: number, news: NewsEdit): News | undefined {
  //   const indexEditNews = this.news.findIndex((news) => news.id === id);

  //   if (indexEditNews !== -1) {
  //     this.news[indexEditNews] = {
  //       ...this.news[indexEditNews],
  //       ...news,
  //     };
  //     return this.news[indexEditNews];
  //   }
  //   return undefined
  // }
}
