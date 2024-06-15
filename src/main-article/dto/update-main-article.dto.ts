import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMainArticleDto } from './create-main-article.dto';

export class UpdateMainArticleDto extends PartialType(CreateMainArticleDto) {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  textButton?: string;

  @ApiProperty()
  image?: string | null;
}
