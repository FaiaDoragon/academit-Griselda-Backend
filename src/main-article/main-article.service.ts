import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MainArticle } from './entities/main-article.entity';
import { CreateMainArticleDto } from './dto/create-main-article.dto';
import { UpdateMainArticleDto } from './dto/update-main-article.dto';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class MainArticleService {
  private readonly logger = new Logger(MainArticleService.name);

  constructor(
    @InjectRepository(MainArticle)
    private mainArticleRepository: Repository<MainArticle>,
  ) {}

  async create(
    mainArticleDto: CreateMainArticleDto,
    file: any,
  ): Promise<MainArticle> {
    this.logger.log(
      `Servicio: MainArticleService, Método: create, Args: ${JSON.stringify({ mainArticleDto, file })}`,
    );

    let mainArticleData = file
      ? { ...mainArticleDto, image: file.path }
      : mainArticleDto;

    try {
      const mainArticle = this.mainArticleRepository.create(mainArticleData);
      await this.mainArticleRepository.save(mainArticle);
      const mainArticleToFind = await this.findOne(mainArticle.id);
      if (!mainArticleToFind) {
        throw new NotFoundException({
          message: 'Error al crear el Articulo Principal.',
          error: 'Bad Request',
          statusCode: 400,
        });
      }
      return mainArticle;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: MainArticleService, Método: create, Args: ${JSON.stringify({ mainArticleDto, file })}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchParams?: { [key: string]: string },
  ): Promise<{
    data: MainArticle[];
    pagination: { totalItems: number; pageCount: number; currentPage: number };
  }> {
    this.logger.log('Servicio: MainArticleService, Método: findAll');

    const { id, title, description, textButton, image } = searchParams;

    const dataFilter = { id, title, description, textButton, image };

    const where: FindOptionsWhere<MainArticle> = {};

    if (dataFilter) {
      Object.keys(searchParams).forEach((key) => {
        if (dataFilter[key] && !['page', 'limit'].includes(key)) {
          where[key] = dataFilter[key];
        }
      });
    }

    const [mainArticles, total] = await this.mainArticleRepository.findAndCount(
      {
        where,
        skip: (+page - 1) * limit,
        take: limit,
      },
    );

    if (mainArticles.length === 0) {
      throw new NotFoundException('No se encontraron encabezados.');
    }

    const pagination = {
      totalItems: total,
      pageCount: Math.ceil(total / limit),
      currentPage: page,
    };

    return { data: mainArticles, pagination };

    // try {
    //   const mainArticles = await this.mainArticleRepository.find({
    //     order: {
    //       id: 'DESC',
    //     },
    //     skip: (page - 1) * limit,
    //     take: limit,
    //   });
    //   if (mainArticles.length === 0) {
    //     throw new NotFoundException({
    //       message: 'No se encontraron artículos principales.',
    //       error: 'Not Found',
    //       statusCode: 404,
    //     });
    //   }
    //   return mainArticles;
    // } catch (error) {
    //   this.logger.error(
    //     `Error en Servicio: MainArticleService, Método: findAll, Error: ${error.message}`,
    //   );
    //   throw new InternalServerErrorException({
    //     message: error.message,
    //     error: error.response?.error,
    //     statusCode: error.status,
    //   });
    // }
  }

  async findOne(id: number): Promise<MainArticle> {
    this.logger.log(
      `Servicio: MainArticleService, Método: findOne, Args: ${id}`,
    );

    try {
      const mainArticle = await this.mainArticleRepository.findOne({
        where: { id },
      });
      if (!mainArticle) {
        throw new NotFoundException({
          message: `El artículo principal con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
      return mainArticle;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: MainArticleService, Método: findOne, Args: ${id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }

  async update(
    id: number,
    updateArticleDto: UpdateMainArticleDto,
    file: any,
  ): Promise<MainArticle> {
    this.logger.log(
      `Accion= Entrando al metodo  ,Servicio: MainArticleService, Método: update`,
    );

    let updateMainArticleData = file
      ? { ...updateArticleDto, image: file.path }
      : updateArticleDto;

    try {
      if (file) {
        const mainArticle = await this.findOne(id);
        const image = mainArticle.image;
        const filePath = path.join(__dirname, `../../${image}`);
        async function deleteFile(filePath: string): Promise<void> {
          try {
            await fs.unlink(filePath);
            console.log('Archivo eliminado exitosamente');
          } catch (err) {
            console.error('Error al eliminar el archivo:', err);
          }
        }
        deleteFile(filePath);
      }
      const result = await this.mainArticleRepository.update(
        id,
        updateMainArticleData,
      );
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El artículo principal con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
      const mainArticle = await this.findOne(id);
      return mainArticle;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: MainArticleService, Método: update, Args: ${JSON.stringify({ id, updateArticleDto, file })}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(
      `Servicio: MainArticleService, Método: remove, Args: ${id}`,
    );

    try {
      const mainArticle = await this.findOne(id);
      const image = mainArticle.image;
      const filePath = path.join(__dirname, `../../${image}`);
      async function deleteFile(filePath: string): Promise<void> {
        try {
          await fs.unlink(filePath);
          console.log('Archivo eliminado exitosamente');
        } catch (err) {
          console.error('Error al eliminar el archivo:', err);
        }
      }
      deleteFile(filePath);
      const result = await this.mainArticleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El artículo principal con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
    } catch (error) {
      this.logger.error(
        `Error en Servicio: MainArticleService, Método: remove, Args: ${id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }
}
