import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({
    description: 'El título del artículo',
    example: 'Un nuevo artículo interesante',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Navegación opcional para el Articulo',
    example: '/nombre-articulo',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  NavegacionTitle?: string;

  @ApiProperty({
    description: 'La descripción del artículo',
    example: 'Esta es una descripción detallada del artículo.',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL de la imagen del artículo (opcional)',
    example: 'https://example.com/imagen.jpg',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
