import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, ValidateNested, IsArray, IsIn, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class VideoDto {
  @ApiProperty({
    description: 'El título del video',
    example: 'Introducción al curso de Angular',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'La descripción del video',
    example: 'Este video cubre los fundamentos del curso de Angular',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'La URL de la miniatura del video',
    example: 'http://example.com/miniatura.jpg',
  })
  @IsString()
  miniatura: string;

  @ApiProperty({
    description: 'El estado del video (activo o inactivo)',
    example: true,
  })
  @IsBoolean()
  estatus: boolean;
}

export class MaterialDto {
  @ApiProperty({
    description: 'El nombre del material',
    example: 'Diapositivas de la primera clase',
  })
  @IsString()
  nombre: string;
}

export class CreateCursoDto {
  @ApiProperty({
    description: 'El título del curso',
    example: 'Introducción a Angular',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'La descripción del curso',
    example: 'Aprende los fundamentos de Angular y cómo construir aplicaciones web interactivas.',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'La URL de la fotografía del curso',
    example: 'http://example.com/fotografia.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  fotografiaDelCurso: string;

  @ApiProperty({
    description: 'El estado del curso (activo o inactivo)',
    example: true,
  })
  @IsBoolean()
  estado: boolean;

  @ApiProperty({
    description: 'La categoría del curso',
    example: 'Desarrollo web',
  })
  @IsString()
  categoria: string;

  @ApiProperty({
    description: 'El nivel del curso',
    example: 'principiante',
    enum: ['principiante', 'medio', 'avanzado'],
  })
  @IsIn(['principiante', 'medio', 'avanzado'])
  nivel: string;

  @ApiProperty({
    description: 'Lista de videos asociados al curso',
    type: [VideoDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos?: VideoDto[];

  @ApiProperty({
    description: 'Lista de materiales asociados al curso',
    type: [MaterialDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  materiales?: MaterialDto[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Archivos de video para el curso',
    required: true,
  })
  @IsDefined()
  @IsArray()
  videosFiles: any[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Archivos de materiales para el curso',
    required: true,
  })
  @IsDefined()
  @IsArray()
  materialesFiles: any[];
}
