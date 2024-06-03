import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(article);
      const articleToFind = await this.findOne(article.id)
      if (!articleToFind) {
        throw new NotFoundException({
          message: 'No se creo el articulo.',
          error: 'Not Created',
          statusCode: 400
        });
      }
      return article;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findAll(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.find();
      if (articles.length === 0) {
        throw new NotFoundException({
          message: 'No se encontraron artículos.',
          error: 'Not Found',
          statusCode: 404
        });
      }
      return articles;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne({ where: { id } });
      if (!article) {
        throw new NotFoundException({
          message: `El artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      return article;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    try {
      const result = await this.articleRepository.update(id, updateArticleDto);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      const article = await this.findOne(id);
      return article;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.articleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }
}
