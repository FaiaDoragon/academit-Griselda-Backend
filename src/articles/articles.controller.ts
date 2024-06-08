import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Artículos')
@Controller('articulos')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiOperation({ summary: 'Crear un nuevo artículo', description: 'Crea un nuevo artículo con los datos proporcionados y opcionalmente una imagen.' })
  @ApiCreatedResponse({ description: 'El artículo se ha creado exitosamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos del artículo y su imagen',
    type: CreateArticleDto,
    required: true,
  })
  create(@Body() createArticleDto: CreateArticleDto, @UploadedFile() file: any) {
    return this.articlesService.create(createArticleDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los artículos', description: 'Recupera una lista de todos los artículos existentes.' })
  @ApiOkResponse({ description: 'Todos los artículos se han recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'No se encontraron artículos.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un artículo por ID', description: 'Recupera un artículo específico usando su ID.' })
  @ApiOkResponse({ description: 'El artículo se ha recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiOperation({ summary: 'Actualizar un artículo', description: 'Actualiza los datos de un artículo existente y opcionalmente su imagen.' })
  @ApiOkResponse({ description: 'El artículo se ha actualizado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta. Por favor, revisa tus datos de entrada.' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos actualizados del artículo y su imagen',
    type: UpdateArticleDto,
    required: true,
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @UploadedFile() file: any) {
    return this.articlesService.update(+id, updateArticleDto, file);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un artículo', description: 'Elimina un artículo existente usando su ID.' })
  @ApiNoContentResponse({ description: 'El artículo se ha eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
