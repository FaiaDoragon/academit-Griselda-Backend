import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';
import { Repository } from 'typeorm';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Injectable()
export class HeadersService {
  constructor(
    @InjectRepository(Header)
    private headersRepository: Repository<Header>,
  ) { }

  async create(itemsData: CreateHeaderItemDto): Promise<Header> {
    try {
      const items = this.headersRepository.create(itemsData);
      await this.headersRepository.save(items);
      const item = this.findOne(items.id)
      if (!item) {
        throw new NotFoundException({
          message: 'Error al crear el Header.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return items;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findAll(): Promise<Header[]> {
    try {
      const items = await this.headersRepository.find({
        order: {
          id: 'DESC'
        },
        take: 1
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
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findOne(id: number): Promise<Header> {
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
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async update(id: number, updateHeaderDto: UpdateHeaderDto): Promise<Header> {
    try {
      // const itemToUpdate = await this.findOne(id)
      const result = await this.headersRepository.update(id, updateHeaderDto);
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
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async remove(id: number): Promise<void> {
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
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }
}
