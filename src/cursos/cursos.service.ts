import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) { }

  async create(createCursoDto: CreateCursoDto, file: any) : Promise<Curso> {

    let createCursoData = file ? { ...createCursoDto, image: file.path } : createCursoDto

    try {
      const curso = this.cursoRepository.create(createCursoData);
      await this.cursoRepository.save(curso);
      const cursoToFind = await this.findOne(curso.id)
      if (!cursoToFind) {
        throw new NotFoundException({
          message: 'Error al crear el Articulo Principal.',
          error: 'Bad Request',
          statusCode: 400
        });
      }
      return curso;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  async findAll() : Promise<Curso[]> {
    try {
      const cursos = await this.cursoRepository.find({
        order: {
          id: 'DESC'
        }
      });
      if (cursos.length === 0) {
        throw new NotFoundException({
          message: 'No se encontraron artículos principales.',
          error: 'Not Found',
          statusCode: 404
        });
      }
      return cursos;
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
        error: error.response.error,
        statusCode: error.status
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto, file: any) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
