import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors, BadRequestException, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CursosService } from './servicio/cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@ApiTags('Cursos')
@Controller('cursos')
export class CursosController {
  private readonly logger = new Logger(CursosController.name);

  constructor(private readonly cursosService: CursosService) {}

  @Get('/')
  @ApiOperation({ summary: 'Obtener todos los cursos', description: 'Retorna una lista de todos los cursos disponibles.' })
  @ApiResponse({ status: 200, description: 'Lista de cursos obtenida exitosamente.' })
  async obtenerCursos(@Query('pagina') pagina: number = 1, @Query('tamaño') tamaño: number = 10) {
    this.logger.log(`Obteniendo cursos - Página: ${pagina}, Tamaño: ${tamaño}`);
    const result = await this.cursosService.obtenerTodos(pagina, tamaño);
    this.logger.log('Cursos obtenidos exitosamente');
    return result;
  }

  @Post('/')
  @ApiOperation({ summary: 'Crear un nuevo curso', description: 'Crea un nuevo curso con los detalles proporcionados.' })
  @ApiResponse({ status: 201, description: 'Curso creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Los detalles del nuevo curso y los archivos de videos y materiales.',
    type: CreateCursoDto,
    required: true,
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'videosFiles', maxCount: 10 },
    { name: 'materialesFiles', maxCount: 10 }
  ], {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      }
    }),
  }))
  async crearCurso(@UploadedFiles() files: { videosFiles?: Express.Multer.File[], materialesFiles?: Express.Multer.File[] }, @Body() body: any) {
    this.logger.log('Creando un nuevo curso');
    const videos = body.videos ? JSON.parse(body.videos) : [];
    const materiales = body.materiales ? JSON.parse(body.materiales) : [];

    const createCursoDto = plainToInstance(CreateCursoDto, {
      ...body,
      estado: body.estado === 'true' || body.estado === true,
      videos,
      materiales
    });

    createCursoDto.videosFiles = files.videosFiles || [];
    createCursoDto.materialesFiles = files.materialesFiles || [];

    const errors = await validate(createCursoDto);
    if (errors.length > 0) {
      this.logger.error('Error en la validación de los datos del curso', errors.toString());
      throw new BadRequestException('Validation failed', errors.toString());
    }

    const result = await this.cursosService.crearCursos(createCursoDto, createCursoDto.videosFiles, createCursoDto.materialesFiles);
    this.logger.log('Curso creado exitosamente');
    return result;
  }
}
