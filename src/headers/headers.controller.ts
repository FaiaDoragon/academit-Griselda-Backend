import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { CreateHeaderItemDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Headers')
@Controller('headers')
export class HeadersController {
  constructor(private readonly headersService: HeadersService) { }

  @Post()
  create(@Body() createHeaderDto: CreateHeaderItemDto) {
    return this.headersService.create(createHeaderDto);
  }

  @Get()
  findAll() {
    return this.headersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeaderDto: UpdateHeaderDto) {
    return this.headersService.update(+id, updateHeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headersService.remove(+id);
  }
}
