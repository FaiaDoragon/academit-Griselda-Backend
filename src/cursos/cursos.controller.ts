import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  create(@Body() CreateCursoDto: CreateCursoDto, @UploadedFile() file : any) {
    return this.cursosService.create(CreateCursoDto, file);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cursosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('video'))
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto, @UploadedFile() file : any) {
    return this.cursosService.update(id, updateCursoDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cursosService.remove(id);
  }
}
