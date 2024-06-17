import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CursosService {
  private readonly logger = new Logger(CursosService.name);

  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto, file: any): Promise<Curso> {
    this.logger.log(
      `Servicio: CursosService, Método: create, Args: ${JSON.stringify({ createCursoDto, file })}`,
    );

    let createCursoData = file
      ? { ...createCursoDto, video: file.path }
      : createCursoDto;

    try {
      const curso = this.cursoRepository.create(createCursoData);
      await this.cursoRepository.save(curso);
      const cursoToFind = await this.findOne(curso.id);
      if (!cursoToFind) {
        throw new NotFoundException({
          message: 'Error al crear el curso.',
          error: 'Bad Request',
          statusCode: 400,
        });
      }
      return curso;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: CursosService, Método: create, Args: ${JSON.stringify({ createCursoDto, file })}, Error: ${error.message}`,
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
    data: Curso[];
    pagination: { totalItems: number; pageCount: number; currentPage: number };
  }> {
    this.logger.log('Servicio: CursosService, Método: findAll');

    const { id, title, description, video } = searchParams;

    const dataFilter = { id, title, description, video };

    const where: FindOptionsWhere<Curso> = {};

    if (dataFilter) {
      Object.keys(searchParams).forEach((key) => {
        if (dataFilter[key] && !['page', 'limit'].includes(key)) {
          where[key] = dataFilter[key];
        }
      });
    }

    const [cursos, total] = await this.cursoRepository.findAndCount({
      where,
      skip: (+page - 1) * limit,
      take: limit,
    });

    if (cursos.length === 0) {
      throw new NotFoundException('No se encontraron encabezados.');
    }

    const pagination = {
      totalItems: total,
      pageCount: Math.ceil(total / limit),
      currentPage: page,
    };

    return { data: cursos, pagination };

  }

  async findOne(id: number): Promise<Curso> {
    this.logger.log(`Servicio: CursosService, Método: findOne, Args: ${id}`);

    try {
      const curso = await this.cursoRepository.findOne({ where: { id } });
      if (!curso) {
        throw new NotFoundException({
          message: `El curso con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
      return curso;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: CursosService, Método: findOne, Args: ${id}, Error: ${error.message}`,
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
    updateCursoDto: UpdateCursoDto,
    file: any,
  ): Promise<Curso> {
    this.logger.log(
      `Servicio: CursosService, Método: update, Args: ${JSON.stringify({ id, updateCursoDto, file })}`,
    );

    let updateCursoData = file
      ? { ...updateCursoDto, video: file.path }
      : updateCursoDto;

    try {
      const result = await this.cursoRepository.update(id, updateCursoData);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El curso con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
      const curso = await this.findOne(id);
      return curso;
    } catch (error) {
      this.logger.error(
        `Error en Servicio: CursosService, Método: update, Args: ${JSON.stringify({ id, updateCursoDto, file })}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Servicio: CursosService, Método: remove, Args: ${id}`);

    try {
      const result = await this.cursoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: `El curso con el ID ${id} no se encontró.`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
    } catch (error) {
      this.logger.error(
        `Error en Servicio: CursosService, Método: remove, Args: ${id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response?.error,
        statusCode: error.status,
      });
    }
  }
}
