import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewArticleService } from './new-article.service';
import { CreateNewArticleDto } from './dto/create-new-article.dto';
import { UpdateNewArticleDto } from './dto/update-new-article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('New Article')
@Controller('new-article')
export class NewArticleController {
  constructor(private readonly newArticleService: NewArticleService) {}

  @Post()
  create(@Body() createNewArticleDto: CreateNewArticleDto) {
    return this.newArticleService.create(createNewArticleDto);
  }

  @Get()
  findAll() {
    return this.newArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newArticleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNewArticleDto: UpdateNewArticleDto) {
    return this.newArticleService.update(id, updateNewArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newArticleService.remove(id);
  }
}
