import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {

    @ApiProperty({
        description: 'El título del artículo',
        example: 'Un nuevo artículo interesante',
    })
    title: string;

    @ApiProperty({
        description: 'La descripción del artículo',
        example: 'Esta es una descripción detallada del artículo.',
    })
    description: string;

    @ApiProperty({
        description: 'URL de la imagen del artículo (opcional)',
        example: 'https://example.com/imagen.jpg',
        required: false,
        nullable: true,
    })
    image?: string | null;
}
