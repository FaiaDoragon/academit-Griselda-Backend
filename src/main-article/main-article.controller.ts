import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MainArticleService } from './main-article.service';
import { CreateMainArticleDto } from './dto/create-main-article.dto';
import { UpdateMainArticleDto } from './dto/update-main-article.dto';
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
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Main Article')
@Controller('main-article')
export class MainArticleController {
  constructor(private readonly mainArticleService: MainArticleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Crear un nuevo artículo principal',
    description:
      'Crea un nuevo artículo principal con los datos proporcionados y opcionalmente una imagen.',
  })
  @ApiCreatedResponse({
    description: 'El artículo principal se ha creado exitosamente.',
  })
  @ApiBadRequestResponse({
    description:
      'Solicitud incorrecta. Por favor, revisa tus datos de entrada.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos del artículo principal y su imagen',
    type: CreateMainArticleDto,
    required: true,
  })
  create(
    @Body() createMainArticleDto: CreateMainArticleDto,
    @UploadedFile() file: any,
  ) {
    return this.mainArticleService.create(createMainArticleDto, file);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los artículos principales',
    description:
      'Recupera una lista de todos los artículos principales existentes.',
  })
  @ApiOkResponse({
    description:
      'Todos los artículos principales se han recuperado exitosamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se encontraron artículos principales.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.mainArticleService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un artículo principal por ID',
    description: 'Recupera un artículo principal específico usando su ID.',
  })
  @ApiOkResponse({
    description: 'El artículo principal se ha recuperado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'Artículo principal no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: number) {
    return this.mainArticleService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Actualizar un artículo principal',
    description:
      'Actualiza los datos de un artículo principal existente y opcionalmente su imagen.',
  })
  @ApiOkResponse({
    description: 'El artículo principal se ha actualizado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'Artículo principal no encontrado.' })
  @ApiBadRequestResponse({
    description:
      'Solicitud incorrecta. Por favor, revisa tus datos de entrada.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos actualizados del artículo principal y su imagen',
    type: UpdateMainArticleDto,
    required: true,
  })
  update(
    @Param('id') id: number,
    @Body() updateMainArticleDto: UpdateMainArticleDto,
    @UploadedFile() file: any,
  ) {
    return this.mainArticleService.update(id, updateMainArticleDto, file);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un artículo principal',
    description: 'Elimina un artículo principal existente usando su ID.',
  })
  @ApiNoContentResponse({
    description: 'El artículo principal se ha eliminado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'Artículo principal no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: number) {
    return this.mainArticleService.remove(id);
  }
}
