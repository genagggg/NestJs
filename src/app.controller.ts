import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/app')
  @Render('index')
  root() {
    return {
      messages: [
        { message: 'hello', author: 'Ben' },
        { message: 'world' },
      ]
    };
  }
}
