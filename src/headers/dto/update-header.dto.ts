import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHeaderItemDto } from './create-header.dto';

export class UpdateHeaderDto extends PartialType(CreateHeaderItemDto) {

    @ApiProperty({
        description: 'Texto para el primer elemento del header',
        example: 'Inicio',
    })
    item01?: string;

    @ApiProperty({
        description: 'Texto opcional para el segundo elemento del header',
        example: 'Acerca de',
        required: false,
        nullable: true,
    })
    item02?: string;

    @ApiProperty({
        description: 'Texto opcional para el tercer elemento del header',
        example: 'Servicios',
        required: false,
        nullable: true,
    })
    item03?: string;

    @ApiProperty({
        description: 'Texto opcional para el cuarto elemento del header',
        example: 'Contacto',
        required: false,
        nullable: true,
    })
    item04?: string;

    @ApiProperty({
        description: 'URL de la imagen del logo del header. Opcional.',
        example: 'https://example.com/logo.png',
        required: false,
        nullable: true,
    })
    logo?: string;
}