import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MainArticleService } from './main-article.service';
import { CreateMainArticleDto } from './dto/create-main-article.dto';
import { UpdateMainArticleDto } from './dto/update-main-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Main Article')
@Controller('main-article')
export class MainArticleController {
  constructor(private readonly mainArticleService: MainArticleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createMainArticleDto: CreateMainArticleDto, @UploadedFile() file : any) {
    return this.mainArticleService.create(createMainArticleDto, file);
  }

  @Get()
  findAll() {
    return this.mainArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mainArticleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMainArticleDto: UpdateMainArticleDto) {
    return this.mainArticleService.update(id, updateMainArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mainArticleService.remove(id);
  }
}
