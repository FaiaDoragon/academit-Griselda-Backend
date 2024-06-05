import { Module } from '@nestjs/common';
import { MainArticleService } from './main-article.service';
import { MainArticleController } from './main-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainArticle } from './entities/main-article.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([MainArticle]),
  MulterModule.register({ ...multerConfig }),],
  controllers: [MainArticleController],
  providers: [MainArticleService],
})
export class MainArticleModule { }
