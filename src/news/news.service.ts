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

  async find(id: News['id']): Promise<NewsEntity[]> {
    return await this.newsRepository.findBy({id: id})
  }

  async getAll():Promise<NewsEntity[]>{
    return await this.newsRepository.find()
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

  async edit(id: number, news: NewsEdit): Promise<NewsEntity | null> {
    const editableNews = await this.find(id)
    if(editableNews){
      const newsEntity = new NewsEntity()
      newsEntity.id = news.id || editableNews[0].id
      newsEntity.title = news.title || editableNews[0].title
      newsEntity.description = news.description || editableNews[0].description
      newsEntity.author = news.author || editableNews[0].author

      this.newsRepository.save({...newsEntity})
   }
 
   return null
}
}
