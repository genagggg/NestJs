import { Injectable } from '@nestjs/common';
import { News, NewsEdit } from './news.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';

export function getRandomInt(min = 1, max = 9999): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

@Injectable()
export class NewsService {
    constructor(@InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,) { }
    private news: News[] = [
        { id: 1, title: 'Новость первая', description: 'Первая новость ....', cover: 'https://wp-s.ru/wallpapers/6/0/489721001584001/britanskij-kot-s-zheltymi-glazami-i-vzglyadom.jpg' },
        { id: 2, title: 'Новость вторая', description: 'Вторая новость ....' },
        { id: 3, title: 'Новость третья', description: 'Третья новость ....' }
    ]


    allNews(): News[] {
        console.log(this.news)
        return this.news
    }

    async create(news: News): Promise<NewsEntity> {
        const newsEntity = new NewsEntity()
        newsEntity.title = news.title;
        newsEntity.description = news.description
        newsEntity.cover = news.cover
        return this.newsRepository.save(newsEntity)

    }

    find(id: News['id']): News | undefined {
        return this.news.find((news) => news.id === id)
    }

    edit(id: number, news: NewsEdit): News | undefined {
        const indexEditableNews = this.news.findIndex((news) => news.id === id)
        if (indexEditableNews !== -1) {
            this.news[indexEditableNews] = {
                ...this.news[indexEditableNews],
                ...news,
            }
            return this.news[indexEditableNews]
        }
        return undefined
    }

    remove(id: News['id']): Boolean {
        const indexRemoveNews = this.news.findIndex((news) => news.id === id)
        if (indexRemoveNews !== -1) {
            this.news.splice(indexRemoveNews, 1)
            return true
        }
        return false
    }


}
