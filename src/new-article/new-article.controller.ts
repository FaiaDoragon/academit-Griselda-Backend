import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewArticleService } from './new-article.service';
import { CreateNewArticleDto } from './dto/create-new-article.dto';
import { UpdateNewArticleDto } from './dto/update-new-article.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('New Article')
@Controller('new-article')
export class NewArticleController {
  constructor(private readonly newArticleService: NewArticleService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo artículo',
    description: 'Crea un nuevo artículo con los datos proporcionados.',
  })
  @ApiCreatedResponse({ description: 'El artículo se ha creado exitosamente.' })
  @ApiBadRequestResponse({
    description:
      'Solicitud incorrecta. Por favor, revisa tus datos de entrada.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
  })
  @ApiBody({
    description: 'Datos del nuevo artículo',
    type: CreateNewArticleDto,
    required: true,
  })
  create(@Body() createNewArticleDto: CreateNewArticleDto) {
    return this.newArticleService.create(createNewArticleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los artículos',
    description: 'Recupera una lista de todos los artículos existentes.',
  })
  @ApiOkResponse({
    description: 'Todos los artículos se han recuperado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'No se encontraron artículos.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 5,
    @Query() searchParams: { [key: string]: string },
  ) {
    return this.newArticleService.findAll(page, limit, searchParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un artículo por ID',
    description: 'Recupera un artículo específico usando su ID.',
  })
  @ApiOkResponse({ description: 'El artículo se ha recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: number) {
    return this.newArticleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un artículo',
    description: 'Actualiza los datos de un artículo existente.',
  })
  @ApiOkResponse({ description: 'El artículo se ha actualizado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({
    description:
      'Solicitud incorrecta. Por favor, revisa tus datos de entrada.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
  })
  @ApiBody({
    description: 'Datos actualizados del artículo',
    type: UpdateNewArticleDto,
    required: true,
  })
  update(
    @Param('id') id: number,
    @Body() updateNewArticleDto: UpdateNewArticleDto,
  ) {
    return this.newArticleService.update(id, updateNewArticleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un artículo',
    description: 'Elimina un artículo existente usando su ID.',
  })
  @ApiNoContentResponse({
    description: 'El artículo se ha eliminado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'Artículo no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: number) {
    return this.newArticleService.remove(id);
  }
}
