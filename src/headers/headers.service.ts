import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class HeadersService {
  private readonly logger = new Logger(HeadersService.name);

  constructor(
    @InjectRepository(Header)
    private headersRepository: Repository<Header>,
  ) {}

  async create(headerItemDto: CreateHeaderItemDto, file: any): Promise<Header> {
    this.logger.log(
      `Servicio: HeadersService, Método: create, Args: ${JSON.stringify({ headerItemDto, file })}`,
    );

    const createHeaderItemData = file
      ? { ...headerItemDto, logo: file.path }
      : headerItemDto;

    try {
      const items = this.headersRepository.create(createHeaderItemData);
      await this.headersRepository.save(items);
      return items;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: HeadersService, Método: create, Args: ${JSON.stringify({ headerItemDto, file })}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al crear el Header.');
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchParams?: { [key: string]: string },
  ): Promise<{
    data: Header[];
    pagination: { totalItems: number; pageCount: number; currentPage: number };
  }> {
    this.logger.log('Servicio: HeadersService, Método: findAll');

    const { id, item01, item02, item03, item04 } = searchParams;

    const dataFilter = { id, item01, item02, item03, item04 };

    const where: FindOptionsWhere<Header> = {};

    if (dataFilter) {
      Object.keys(searchParams).forEach((key) => {
        if (dataFilter[key] && !['page', 'limit'].includes(key)) {
          where[key] = dataFilter[key];
        }
      });
    }

    const [items, total] = await this.headersRepository.findAndCount({
      where,
      skip: (+page - 1) * limit,
      take: limit,
    });

    if (items.length === 0) {
      throw new NotFoundException('No se encontraron encabezados.');
    }

    const pagination = {
      totalItems: total,
      pageCount: Math.ceil(total / limit),
      currentPage: page,
    };

    return { data: items, pagination };
  }

  async findOne(id: number): Promise<Header> {
    this.logger.log(`Servicio: HeadersService, Método: findOne, Args: ${id}`);

    try {
      const item = await this.headersRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException(
          `El encabezado con el ID ${id} no se encontró.`,
        );
      }
      return item;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: HeadersService, Método: findOne, Args: ${id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al obtener el Header.');
    }
  }

  async update(
    id: number,
    updateHeaderDto: UpdateHeaderDto,
    file: any,
  ): Promise<Header> {
    this.logger.log(
      `Servicio: HeadersService, Método: update, Args: ${JSON.stringify({
        id,
        updateHeaderDto,
        file,
      })}`,
    );

    const updateHeaderData = file
      ? { ...updateHeaderDto, logo: file.path }
      : updateHeaderDto;

    try {
      if (file) {
        const header = await this.findOne(id);
        const logo = header.logo;
        const filePath = path.join(__dirname, `../../${logo}`);
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
      const result = await this.headersRepository.update(id, updateHeaderData);
      if (result.affected === 0) {
        throw new NotFoundException(
          `El encabezado con el ID ${id} no se encontró.`,
        );
      }
      return this.findOne(id);
    } catch (error) {
      this.logger.error(
        `Error en Servicio: HeadersService, Método: update, Args: ${JSON.stringify(
          {
            id,
            updateHeaderDto,
            file,
          },
        )}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al actualizar el Header.');
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Servicio: HeadersService, Método: remove, Args: ${id}`);

    try {
      const header = await this.findOne(id);
      const logo = header.logo;
      const filePath = path.join(__dirname, `../../${logo}`);
      async function deleteFile(filePath: string): Promise<void> {
        try {
          await fs.unlink(filePath);
          console.log('Archivo eliminado exitosamente');
        } catch (err) {
          console.error('Error al eliminar el archivo:', err);
        }
      }
      deleteFile(filePath);
      const result = await this.headersRepository.delete(+id);
      if (result.affected === 0) {
        throw new NotFoundException(
          `El encabezado con el ID ${id} no se encontró.`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error en Servicio: HeadersService, Método: remove, Args: ${id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al eliminar el Header.');
    }
  }
}
