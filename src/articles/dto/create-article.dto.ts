import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'El título del artículo',
    example: 'Un nuevo artículo interesante',
    required: true,
    nullable: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Navegación opcional para el Articulo',
    example: '/nombre-articulo',
    required: true,
    nullable: true,
  })
  @IsString()
  NavegacionTitle: string;

  @ApiProperty({
    description: 'La descripción del artículo',
    example: 'Esta es una descripción detallada del artículo.',
    required: true,
    nullable: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL de la imagen del artículo (opcional)',
    example: 'https://example.com/imagen.jpg',
    required: true,
    nullable: true,
  })
  @IsString()
  image: string;
}
