import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleResponseDto } from './dto/response-article.dto'; // Importa el DTO de respuesta

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    
  ) {}

  // Método para mapear la entidad a DTO de respuesta
  private entityToResponseDto(article: Article): ArticleResponseDto {
    const { id, title, description, image, createdAt, updatedAt } = article;
    return { id, title, description, image, createdAt, updatedAt };
  }

  async create(articleData: CreateArticleDto, file: any): Promise<ArticleResponseDto> {
    this.logger.log(`Servicio: ArticlesService, Método: create, Args: ${JSON.stringify({ articleData, file })}`);

    let articleData2 = file ? { ...articleData, image: file.path } : articleData;

    try {
      const article = this.articleRepository.create(articleData2);
      await this.articleRepository.save(article);
      const articleToFind = await this.findOne(article.id);
      if (!articleToFind) {
        throw new NotFoundException({
          message: 'No se creó el artículo.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return this.entityToResponseDto(article); // Mapea la entidad a DTO de respuesta antes de devolverla
    } catch (error) {
      this.logger.error(`Error en Servicio: ArticlesService, Método: create, Args: ${JSON.stringify({ articleData, file })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findAll(page : number, limit : number): Promise<ArticleResponseDto[]> {
    this.logger.log('Servicio: ArticlesService, Método: findAll');

    try {
      const articles = await this.articleRepository.find({
        order: {
          id: 'DESC'
        },
        skip: (page - 1) * limit,
        take: limit
      });
      
      if (articles.length === 0) {
        throw new NotFoundException({
          message: 'No se encontraron artículos.',
          error: 'Not Found',
          statusCode: 404
        });
      }
      return articles.map(article => this.entityToResponseDto(article)); // Mapea todas las entidades a DTO de respuesta
    } catch (error) {
      this.logger.error(`Error en Servicio: ArticlesService, Método: findAll, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<ArticleResponseDto> {
    this.logger.log(`Servicio: ArticlesService, Método: findOne, Args: ${id}`);

    try {
      const article = await this.articleRepository.findOne({ where: { id } });
      if (!article) {
        throw new NotFoundException({
          message: `El artículo con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      return this.entityToResponseDto(article); // Mapea la entidad a DTO de respuesta antes de devolverla
    } catch (error) {
      this.logger.error(`Error en Servicio: ArticlesService, Método: findOne, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, file: any): Promise<ArticleResponseDto> {
    this.logger.log(`Servicio: ArticlesService, Método: update, Args: ${JSON.stringify({ id, updateArticleDto, file })}`);

    const articleData = file ? { ...updateArticleDto, image: file.path } : updateArticleDto;

    try {
      const result = await this.articleRepository.update(id, articleData);
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
      this.logger.error(`Error en Servicio: ArticlesService, Método: update, Args: ${JSON.stringify({ id, updateArticleDto, file })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Servicio: ArticlesService, Método: remove, Args: ${id}`);

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
      this.logger.error(`Error en Servicio: ArticlesService, Método: remove, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  
}
