import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { News } from 'src/news/news.interface';
import { CreateNewsDto } from 'src/news/dtos/create-news-dto';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }
    async sendTest() {
        console.log('Отправляется письмо установки');
        return this.mailerService
            .sendMail({
                to: 'snezhkinv@yandex.ru',
                subject:
                    'Первое тестовое письмо',
                template: './test',
            })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    async sendNewNewsForAdmins(emails: string[], news: News): Promise<void> {
        console.log('Отправляются письма о новой новости администрацииресурса');
        for (const email of emails) {
            await this.mailerService
                .sendMail({
                    to: email,
                    subject: `Создана новая новость: ${news.title}`,
                    template: './new-news',
                    context: news,
                })
                .then((res) => {
                    console.log('res', res);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }
}
