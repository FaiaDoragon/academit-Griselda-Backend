import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNewArticleDto } from './create-new-article.dto';

export class UpdateNewArticleDto extends PartialType(CreateNewArticleDto) {
  @ApiProperty({
    description: 'El título de la sección del artículo',
    example: 'Tecnología',
  })
  sectiontitle?: string;

  @ApiProperty({
    description: 'El título del artículo',
    example: 'Las nuevas tendencias en inteligencia artificial',
  })
  articletitle?: string;

  @ApiProperty({
    description: 'La descripción del artículo',
    example:
      'Descubre las últimas innovaciones en inteligencia artificial y su impacto en diferentes industrias.',
  })
  description?: string;
}
