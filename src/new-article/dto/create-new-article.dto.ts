import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewArticleDto {
  @ApiProperty({
    description: 'El título de la sección del artículo',
    example: 'Tecnología',
    required: true,
    nullable: true,
  })
  @IsString()
  sectiontitle: string;

  @ApiProperty({
    description: 'El título del artículo',
    example: 'Las nuevas tendencias en inteligencia artificial',
    required: true,
    nullable: true,
  })
  @IsString()
  articletitle: string;

  @ApiProperty({
    description: 'La ruta a la cual el boton va a navegar',
    example: '/ejemplo-articulo',
    required: true,
    nullable: true,
  })
  @IsString()
  NavegacionArticleTitle: string;

  @ApiProperty({
    description: 'La descripción del artículo',
    example:
      'Descubre las últimas innovaciones en inteligencia artificial y su impacto en diferentes industrias.',
    required: true,
    nullable: true,
  })
  @IsString()
  description: string;
}
