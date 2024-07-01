import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHeaderItemDto } from './create-header.dto';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateHeaderDto extends PartialType(CreateHeaderItemDto) {
  @ApiProperty({
    description: 'Texto cambiado para el primer elemento del header',
    example: 'Home',
  })
  @IsString()
  @IsOptional()
  item01?: string;

  @ApiProperty({
    description: 'Navegación cambiada para el primer elemento del header',
    example: 'Inicio',
  })
  @IsString()
  @IsOptional()
  NavegacionItem01?: string;

  @ApiProperty({
    description: 'Texto cambiado y opcional para el segundo elemento del header',
    example: 'About',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item02?: string;

  @ApiProperty({
    description: 'Navegación cambiada y opcional para el segundo elemento del header',
    example: 'Acerca de',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem02?: string;

  @ApiProperty({
    description: 'Texto cambiado y opcional para el tercer elemento del header',
    example: 'services',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item03?: string;

  @ApiProperty({
    description: 'Navegación cambiada y opcional para el tercer elemento del header',
    example: 'servicios',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem03?: string;

  @ApiProperty({
    description: 'Texto cambiado y opcional para el cuarto elemento del header',
    example: 'Contact',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  item04?: string;

  @ApiProperty({
    description: 'Navegación cambiado y opcional para el cuarto elemento del header',
    example: 'contacto',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  NavegacionItem04?: string;

  @ApiProperty({
    description: 'URL cambiada de la imagen del logo del header. Opcional.',
    example: 'https://example.com/logo.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  logo?: string;
}
