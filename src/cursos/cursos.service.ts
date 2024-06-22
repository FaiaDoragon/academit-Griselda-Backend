import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class CursosService {
  private readonly logger = new Logger(CursosService.name);

  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto, file: any): Promise<Curso> {
    this.logger.log(
      `Método: create, Args: ${JSON.stringify({ createCursoDto, file })}`,
    );

    const createCursoData = file
      ? { ...createCursoDto, video: file.path }
      : createCursoDto;

    try {
      const curso = this.cursoRepository.create(createCursoData);
      await this.cursoRepository.save(curso);
      const cursoToFind = await this.findOne(curso.id);
      if (!cursoToFind) {
        throw new BadRequestException('Error al crear el curso.');
      }
      return curso;
    } catch (error) {
      this.logger.error(
        `Método: create, Args: ${JSON.stringify({ createCursoDto, file })}, Error: ${error.message}`,
      );
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException('Ya existe un curso con los mismos datos.');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error interno al crear el curso.',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchParams?: { [key: string]: string },
  ): Promise<{
    data: Curso[];
    pagination: { totalItems: number; pageCount: number; currentPage: number };
  }> {
    this.logger.log('Método: findAll');

    const where: FindOptionsWhere<Curso> = {};

    if (searchParams) {
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] && !['page', 'limit'].includes(key)) {
          where[key] = searchParams[key];
        }
      });
    }

    try {
      const [cursos, total] = await this.cursoRepository.findAndCount({
        where,
        skip: (+page - 1) * limit,
        take: limit,
      });

      if (cursos.length === 0) {
        throw new NotFoundException('No se encontraron cursos.');
      }

      const pagination = {
        totalItems: total,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
      };

      return { data: cursos, pagination };
    } catch (error) {
      this.logger.error(`Método: findAll, Error: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error interno al obtener los cursos.',
      );
    }
  }

  async findOne(id: number): Promise<Curso> {
    this.logger.log(`Método: findOne, Args: ${id}`);

    try {
      const curso = await this.cursoRepository.findOne({ where: { id } });
      if (!curso) {
        throw new NotFoundException(`El curso con el ID ${id} no se encontró.`);
      }
      return curso;
    } catch (error) {
      this.logger.error(
        `Método: findOne, Args: ${id}, Error: ${error.message}`,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error interno al obtener el curso.',
      );
    }
  }

  async update(
    id: number,
    updateCursoDto: UpdateCursoDto,
    file: any,
  ): Promise<Curso> {
    this.logger.log(
      `Método: update, Args: ${JSON.stringify({ id, updateCursoDto, file })}`,
    );

    const updateCursoData = file
      ? { ...updateCursoDto, video: file.path }
      : updateCursoDto;

    try {
      const curso = await this.findOne(id);

      if (file) {
        const video = curso.video;
        const filePath = path.join(__dirname, `../../${video}`);
        await this.deleteFile(filePath);
      }

      const result = await this.cursoRepository.update(id, updateCursoData);
      if (result.affected === 0) {
        throw new NotFoundException(`El curso con el ID ${id} no se encontró.`);
      }

      return await this.findOne(id);
    } catch (error) {
      this.logger.error(
        `Método: update, Args: ${JSON.stringify({ id, updateCursoDto, file })}, Error: ${error.message}`,
      );
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException('Ya existe un curso con los mismos datos.');
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error interno al actualizar el curso.',
      );
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Método: remove, Args: ${id}`);

    try {
      const curso = await this.findOne(id);
      if (curso.video) {
        const filePath = path.join(__dirname, `../../${curso.video}`);
        await this.deleteFile(filePath);
      }

      const result = await this.cursoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`El curso con el ID ${id} no se encontró.`);
      }
    } catch (error) {
      this.logger.error(`Método: remove, Args: ${id}, Error: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error interno al eliminar el curso.',
      );
    }
  }

  private async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
      this.logger.log(`Archivo eliminado exitosamente: ${filePath}`);
    } catch (err) {
      this.logger.error(
        `Error al eliminar el archivo: ${filePath}, Error: ${err.message}`,
      );
      throw new InternalServerErrorException('Error al eliminar el archivo.');
    }
  }
}
