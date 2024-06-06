import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Headers')
@Controller('headers')
export class HeadersController {
  constructor(private readonly headersService: HeadersService) { }

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(@Body() createHeaderDto: CreateHeaderItemDto, @UploadedFile() file : any) {
    return this.headersService.create(createHeaderDto, file);
  }

  @Get()
  findAll() {
    return this.headersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.headersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHeaderDto: UpdateHeaderDto) {
    return this.headersService.update(id, updateHeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headersService.remove(+id);
  }
}
