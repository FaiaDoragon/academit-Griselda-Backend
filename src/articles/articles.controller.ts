import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponseDto } from './dto/response-article.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';

@ApiTags('Artículos')
@Controller('articulos')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Crear un nuevo artículo', description: 'Crea un nuevo artículo con los datos proporcionados y opcionalmente una imagen.' })
  @ApiCreatedResponse({ description: 'El artículo se ha creado exitosamente.', type: ArticleResponseDto }) // Usa el DTO de respuesta en la anotación de Swagger
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos del artículo y su imagen',
    type: CreateArticleDto,
    required: true,
  })
  async create(@Body() createArticleDto: CreateArticleDto, @UploadedFile() file: any): Promise<ArticleResponseDto> {
    return await this.articlesService.create(createArticleDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los artículos', description: 'Recupera una lista de todos los artículos existentes.' })
  @ApiOkResponse({ description: 'Todos los artículos se han recuperado exitosamente.', type: [ArticleResponseDto] }) // Usa el DTO de respuesta en la anotación de Swagger
  @ApiNotFoundResponse({ description: 'No se encontraron artículos.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<ArticleResponseDto[]> {
    return await this.articlesService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un artículo por ID', description: 'Recupera un artículo específico usando su ID.' })
  @ApiOkResponse({ description: 'El artículo se ha recuperado exitosamente.', type: ArticleResponseDto }) // Usa el DTO de respuesta en la anotación de Swagger
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiParam({ name: 'id', description: 'ID del artículo', type: 'number' })
  async findOne(@Param('id') id: string): Promise<ArticleResponseDto> {
    return await this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Actualizar un artículo', description: 'Actualiza los datos de un artículo existente y opcionalmente su imagen.' })
  @ApiOkResponse({ description: 'El artículo se ha actualizado exitosamente.', type: ArticleResponseDto }) // Usa el DTO de respuesta en la anotación de Swagger
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos actualizados del artículo y su imagen',
    type: UpdateArticleDto,
    required: true,
  })
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @UploadedFile() file: any): Promise<ArticleResponseDto> {
    return await this.articlesService.update(+id, updateArticleDto, file);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un artículo', description: 'Elimina un artículo existente usando su ID.' })
  @ApiNoContentResponse({ description: 'El artículo se ha eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiParam({ name: 'id', description: 'ID del artículo', type: 'number' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.articlesService.remove(+id);
  }
}
