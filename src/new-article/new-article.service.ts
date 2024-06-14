import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateNewArticleDto } from './dto/create-new-article.dto';
import { UpdateNewArticleDto } from './dto/update-new-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewArticle } from './entities/new-article.entity';

@Injectable()
export class NewArticleService {
  private readonly logger = new Logger(NewArticleService.name);

  constructor(
    @InjectRepository(NewArticle)
    private newArticleRepository: Repository<NewArticle>,
  ) { }

  async create(createNewArticleDto: CreateNewArticleDto): Promise<NewArticle> {
    this.logger.log(`Servicio: NewArticleService, Método: create, Args: ${JSON.stringify({ createNewArticleDto })}`);

    try {
      const newArticle = this.newArticleRepository.create(createNewArticleDto);
      await this.newArticleRepository.save(newArticle);
      const newArticleToFind = await this.findOne(newArticle.id);
      if (!newArticleToFind) {
        throw new NotFoundException({
          message: 'No se creó el artículo.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return newArticle;
    } catch (error) {
      this.logger.error(`Error en Servicio: NewArticleService, Método: create, Args: ${JSON.stringify({ createNewArticleDto })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findAll(page : number, limit : number): Promise<NewArticle[]> {
    this.logger.log('Servicio: NewArticleService, Método: findAll');

    try {
      const newArticles = await this.newArticleRepository.find({
        order: {
          id: 'DESC'
        },
        skip: (page - 1) * limit,
        take: limit
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
      this.logger.error(`Error en Servicio: NewArticleService, Método: findAll, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<NewArticle> {
    this.logger.log(`Servicio: NewArticleService, Método: findOne, Args: ${id}`);

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
      this.logger.error(`Error en Servicio: NewArticleService, Método: findOne, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateNewArticleDto: UpdateNewArticleDto): Promise<NewArticle> {
    this.logger.log(`Servicio: NewArticleService, Método: update, Args: ${JSON.stringify({ id, updateNewArticleDto })}`);

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
      this.logger.error(`Error en Servicio: NewArticleService, Método: update, Args: ${JSON.stringify({ id, updateNewArticleDto })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Servicio: NewArticleService, Método: remove, Args: ${id}`);

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
      this.logger.error(`Error en Servicio: NewArticleService, Método: remove, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }
}
