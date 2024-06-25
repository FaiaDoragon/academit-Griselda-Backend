import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMainArticleDto {
  @ApiProperty({
    description: 'El título del artículo principal',
    example: 'Nuevo lanzamiento: Descubre nuestro último producto',
    required: true,
    nullable: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'La descripción del artículo principal',
    example:
      'Conoce todas las características emocionantes de nuestro nuevo producto.',
    required: true,
    nullable: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'El texto del botón del artículo principal',
    example: 'Descúbrelo ahora',
    required: true,
    nullable: true,
  })
  @IsString()
  textButton: string;

  @ApiProperty({
    description: 'La ruta a la cual el boton va a navegar',
    example: '/button',
    required: false,
    nullable: true,
  })
  @IsString()
  NavegacionBoton: string;

  @ApiProperty({
    description: 'La URL de la imagen del artículo principal. Opcional.',
    example: 'https://example.com/imagen.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  image: string;
}
