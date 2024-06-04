import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateNewArticleDto } from './dto/create-new-article.dto';
import { UpdateNewArticleDto } from './dto/update-new-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewArticle } from './entities/new-article.entity';

@Injectable()
export class NewArticleService {
  constructor(
    @InjectRepository(NewArticle)
    private newArticleRepository: Repository<NewArticle>,
  ) { }

  async create(createNewArticleDto: CreateNewArticleDto): Promise<NewArticle> {
    try {
      const newArticle = this.newArticleRepository.create(createNewArticleDto);
      await this.newArticleRepository.save(newArticle);
      const newArticleToFind = await this.findOne(newArticle.id)
      if (!newArticleToFind) {
        throw new NotFoundException({
          message: 'No se creo el articulo.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return newArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findAll(): Promise<NewArticle[]> {
    try {
      const newArticles = await this.newArticleRepository.find({
        order: {
          id: 'DESC'
        },
        take: 3
      });
      if (newArticles.length === 0) {
        throw new NotFoundException({
          message: 'No se encontraron nuevos artículos.',
          error: 'Not Found',
          statusCode: 404
        });
      }
      return newArticles;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<NewArticle> {
    try {
      const newArticle = await this.newArticleRepository.findOne({ where: { id } });
      if (!newArticle) {
        throw new NotFoundException({
          message: `El nuevo artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      return newArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateNewArticleDto: UpdateNewArticleDto): Promise<NewArticle> {
    try {
      const result = await this.newArticleRepository.update(id, updateNewArticleDto);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El nuevo artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      const newArticle = await this.findOne(id);
      return newArticle;
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
      const result = await this.newArticleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El nuevo artículo con el ID ${id} no se encontró.`,
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
