import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponseDto {
  @ApiProperty({ example: 1, description: 'ID del artículo' })
  id: number;

  @ApiProperty({ example: 'Título del artículo', description: 'Título del artículo' })
  title: string;

  @ApiProperty({ example: 'Descripción del artículo', description: 'Descripción del artículo' })
  description: string;

  @ApiProperty({ example: 'imagen.jpg', description: 'URL de la imagen del artículo', nullable: true })
  image: string;

  @ApiProperty({ example: '2024-06-11T00:00:00.000Z', description: 'Fecha de creación del artículo', nullable: true })
  createdAt: Date;

  @ApiProperty({ example: '2024-06-11T00:00:00.000Z', description: 'Fecha de actualización del artículo', nullable: true })
  updatedAt: Date;
}



export class ArticleResponseArrayDto {
  @ApiProperty({ type: [ArticleResponseDto] })
  articles: ArticleResponseDto[];
}
