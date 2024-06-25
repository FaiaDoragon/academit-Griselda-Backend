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
    description: 'Navegación para el primer elemento del header',
    example: 'home',
  })
  @IsString()
  NavegacionItem01: string;

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
    description: 'Navegación opcional para el segundo elemento del header',
    example: 'about',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem02?: string;

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
    description: 'Navegación opcional para el tercer elemento del header',
    example: 'services',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem03?: string;

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
    description: 'Navegación opcional para el cuarto elemento del header',
    example: 'contact',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem04?: string;

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
