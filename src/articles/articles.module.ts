import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([Article]),
  MulterModule.register({ ...multerConfig }),],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
