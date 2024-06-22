import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateHeaderItemDto {
  @ApiProperty({
    description: 'Texto para el primer elemento del header',
    example: 'Inicio',
  })
  @IsString()
  item01: string;

  @ApiProperty({
    description: 'Texto opcional para el segundo elemento del header',
    example: 'Acerca de',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item02?: string;

  @ApiProperty({
    description: 'Texto opcional para el tercer elemento del header',
    example: 'Servicios',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item03?: string;

  @ApiProperty({
    description: 'Texto opcional para el cuarto elemento del header',
    example: 'Contacto',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item04?: string;

  @ApiProperty({
    description: 'URL de la imagen del logo del header. Opcional.',
    example: 'https://example.com/logo.png',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  logo?: string;
}

export class UpdateHeaderDto extends CreateHeaderItemDto {}
