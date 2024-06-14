import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';
import { Repository } from 'typeorm';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Injectable()
export class HeadersService {
  private readonly logger = new Logger(HeadersService.name);

  constructor(
    @InjectRepository(Header)
    private headersRepository: Repository<Header>,
  ) {}

  async create(headerItemDto: CreateHeaderItemDto, file: any): Promise<Header> {
    this.logger.log(`Servicio: HeadersService, Método: create, Args: ${JSON.stringify({ headerItemDto, file })}`);

    let CreateHeaderItemData = file ? { ...headerItemDto, logo: file.path } : headerItemDto;
    
    try {
      const items = this.headersRepository.create(CreateHeaderItemData);
      await this.headersRepository.save(items);
      const item = await this.findOne(items.id);
      if (!item) {
        throw new NotFoundException({
          message: 'Error al crear el Header.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return items;
    } catch (error) {
      this.logger.error(`Error en Servicio: HeadersService, Método: create, Args: ${JSON.stringify({ headerItemDto, file })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findAll(page : number, limit : number): Promise<Header[]> {
    this.logger.log('Servicio: HeadersService, Método: findAll');

    try {
      const items = await this.headersRepository.find({
        order: {
          id: 'DESC'
        },
        skip: (page - 1) * limit,
        take: limit
      });
      if (items.length === 0) {
        throw new NotFoundException({
          message: 'No se encontraron encabezados.',
          error: 'Not Found',
          statusCode: 404
        });
      }
      return items;
    } catch (error) {
      this.logger.error(`Error en Servicio: HeadersService, Método: findAll, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<Header> {
    this.logger.log(`Servicio: HeadersService, Método: findOne, Args: ${id}`);

    try {
      const item = await this.headersRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException({
          message: `El encabezado con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      return item;
    } catch (error) {
      this.logger.error(`Error en Servicio: HeadersService, Método: findOne, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateHeaderDto: UpdateHeaderDto, file: any): Promise<Header> {
    this.logger.log(`Servicio: HeadersService, Método: update, Args: ${JSON.stringify({ id, updateHeaderDto, file })}`);

    let updateHeaderData = file ? { ...updateHeaderDto, logo: file.path } : updateHeaderDto;

    try {
      const result = await this.headersRepository.update(id, updateHeaderData);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El encabezado con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
      const item = await this.findOne(id);
      return item;
    } catch (error) {
      this.logger.error(`Error en Servicio: HeadersService, Método: update, Args: ${JSON.stringify({ id, updateHeaderDto, file })}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Servicio: HeadersService, Método: remove, Args: ${id}`);

    try {
      const result = await this.headersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El encabezado con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404
        });
      }
    } catch (error) {
      this.logger.error(`Error en Servicio: HeadersService, Método: remove, Args: ${id}, Error: ${error.message}`);
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status
      });
    }
  }
}
