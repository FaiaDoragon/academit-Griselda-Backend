import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMainArticleDto } from './create-main-article.dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMainArticleDto extends PartialType(CreateMainArticleDto) {
  @ApiProperty({
    description: 'El título del artículo principal',
    example: 'Nuevo lanzamiento: Descubre nuestro último producto',
    required: false,
    nullable: true,
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'La descripción del artículo principal',
    example:
      'Conoce todas las características emocionantes de nuestro nuevo producto.',
    required: false,
    nullable: true,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'El texto del botón del artículo principal',
    example: 'Descúbrelo ahora',
    required: false,
    nullable: true,
  })
  @IsString()
  textButton?: string;

  @ApiProperty({
    description: 'La ruta a la cual el boton va a navegar',
    example: '/button',
    required: false,
    nullable: true,
  })
  @IsString()
  NavegacionBoton?: string;

  @ApiProperty({
    description: 'La URL de la imagen del artículo principal. Opcional.',
    example: 'https://example.com/imagen.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  image?: string;
}
