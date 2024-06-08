import { ApiProperty } from '@nestjs/swagger';

export class CreateMainArticleDto {

    @ApiProperty({
        description: 'El título del artículo principal',
        example: 'Nuevo lanzamiento: Descubre nuestro último producto',
    })
    title: string;

    @ApiProperty({
        description: 'La descripción del artículo principal',
        example: 'Conoce todas las características emocionantes de nuestro nuevo producto.',
    })
    description: string;

    @ApiProperty({
        description: 'El texto del botón del artículo principal',
        example: 'Descúbrelo ahora',
    })
    textButton: string;

    @ApiProperty({
        description: 'La URL de la imagen del artículo principal. Opcional.',
        example: 'https://example.com/imagen.jpg',
        required: false,
        nullable: true,
    })
    image?: string | null;
}
