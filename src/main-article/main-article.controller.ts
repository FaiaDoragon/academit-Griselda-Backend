import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainArticleService } from './main-article.service';
import { CreateMainArticleDto } from './dto/create-main-article.dto';
import { UpdateMainArticleDto } from './dto/update-main-article.dto';

@Controller('main-article')
export class MainArticleController {
  constructor(private readonly mainArticleService: MainArticleService) {}

  @Post()
  create(@Body() createMainArticleDto: CreateMainArticleDto) {
    return this.mainArticleService.create(createMainArticleDto);
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
