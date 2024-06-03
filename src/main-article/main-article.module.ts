import { Module } from '@nestjs/common';
import { MainArticleService } from './main-article.service';
import { MainArticleController } from './main-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainArticle } from './entities/main-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainArticle])],
  controllers: [MainArticleController],
  providers: [MainArticleService],
})
export class MainArticleModule {}
