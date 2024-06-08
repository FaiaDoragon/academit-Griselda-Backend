import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Cursos')
@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  @ApiOperation({ summary: 'Crear un nuevo curso', description: 'Crea un nuevo curso con los datos proporcionados y opcionalmente un video.' })
  @ApiCreatedResponse({ description: 'El curso se ha creado exitosamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos del curso y su video',
    type: CreateCursoDto,
    required: true,
  })
  create(@Body() createCursoDto: CreateCursoDto, @UploadedFile() file: any) {
    return this.cursosService.create(createCursoDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos', description: 'Recupera una lista de todos los cursos existentes.' })
  @ApiOkResponse({ description: 'Todos los cursos se han recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'No se encontraron cursos.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID', description: 'Recupera un curso específico usando su ID.' })
  @ApiOkResponse({ description: 'El curso se ha recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Curso no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: number) {
    return this.cursosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('video'))
  @ApiOperation({ summary: 'Actualizar un curso', description: 'Actualiza los datos de un curso existente y opcionalmente su video.' })
  @ApiOkResponse({ description: 'El curso se ha actualizado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Curso no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos actualizados del curso y su video',
    type: UpdateCursoDto,
    required: true,
  })
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto, @UploadedFile() file: any) {
    return this.cursosService.update(id, updateCursoDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un curso', description: 'Elimina un curso existente usando su ID.' })
  @ApiNoContentResponse({ description: 'El curso se ha eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Curso no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: number) {
    return this.cursosService.remove(id);
  }
}
