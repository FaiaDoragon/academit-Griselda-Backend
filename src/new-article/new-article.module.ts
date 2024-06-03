import { Module } from '@nestjs/common';
import { NewArticleService } from './new-article.service';
import { NewArticleController } from './new-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewArticle } from './entities/new-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewArticle])],
  controllers: [NewArticleController],
  providers: [NewArticleService],
})
export class NewArticleModule {}
