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
import { HeadersService } from './headers.service';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
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
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Headers')
@Controller('headers')
export class HeadersController {
  constructor(private readonly headersService: HeadersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  @ApiOperation({
    summary: 'Crear un nuevo header',
    description:
      'Crea un nuevo header con los datos proporcionados y opcionalmente un logo.',
  })
  @ApiCreatedResponse({ description: 'El header se ha creado exitosamente.' })
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
    description: 'Datos del header y su logo',
    type: CreateHeaderItemDto,
    required: true,
  })
  create(
    @Body() createHeaderDto: CreateHeaderItemDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.headersService.create(createHeaderDto, file);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los headers',
    description: 'Recupera una lista de todos los headers existentes.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Número de la página (para paginación)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Número de elementos por página (para paginación)',
  })
  @ApiQuery({
    name: 'searchParams',
    type: 'object',
    required: false,
    description: 'Parámetros de búsqueda opcionales',
    isArray: true,
    example: { item1: 'example', item2: 'example' },
  })
  @ApiOkResponse({
    description: 'Todos los headers se han recuperado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'No se encontraron headers.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query() searchParams: { [key: string]: string },
  ) {
    return this.headersService.findAll(page, limit, searchParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un header por ID',
    description: 'Recupera un header específico usando su ID.',
  })
  @ApiOkResponse({ description: 'El header se ha recuperado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Header no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: number) {
    return this.headersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo'))
  @ApiOperation({
    summary: 'Actualizar un header',
    description:
      'Actualiza los datos de un header existente y opcionalmente su logo.',
  })
  @ApiOkResponse({ description: 'El header se ha actualizado exitosamente.' })
  @ApiNotFoundResponse({ description: 'Header no encontrado.' })
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
    description: 'Datos actualizados del header y su logo',
    type: UpdateHeaderDto,
    required: true,
  })
  update(
    @Param('id') id: number,
    @Body() updateHeaderDto: UpdateHeaderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.headersService.update(id, updateHeaderDto, file);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un header',
    description: 'Elimina un header existente usando su ID.',
  })
  @ApiNoContentResponse({
    description: 'El header se ha eliminado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'Header no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: string) {
    return this.headersService.remove(+id);
  }
}
