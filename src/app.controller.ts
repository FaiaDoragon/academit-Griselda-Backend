import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(@Res() res: Response): void {
    const welcomeMessage = this.appService.getWelcomeMessage();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(welcomeMessage);
  }
}
