import { ApiProperty } from '@nestjs/swagger';

export class HeaderResponseDto {
  @ApiProperty({ example: 1, description: 'ID del artículo' })
  id: number;

  @ApiProperty({
    example: 'Home',
    description: 'nombre del primer item del header',
  })
  item01: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'Ruta que se asignara al item01',
  })
  NavegacionIitem01: string;

  @ApiProperty({
    example: 'imagen.jpg',
    description: 'URL del Logo',
    nullable: true,
  })
  logo: string;

  @ApiProperty({
    example: '2024-06-11T00:00:00.000Z',
    description: 'Fecha de creación del artículo',
    nullable: true,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-11T00:00:00.000Z',
    description: 'Fecha de actualización del artículo',
    nullable: true,
  })
  updatedAt: Date;
}

export class HeaderResponseArrayDto {
  @ApiProperty({ type: [HeaderResponseDto] })
  articles: HeaderResponseDto[];
}
