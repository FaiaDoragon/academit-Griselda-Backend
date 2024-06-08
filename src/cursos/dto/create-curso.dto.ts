import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {

    @ApiProperty({
        description: 'El título del curso',
        example: 'Introducción a Angular',
    })
    title: string;

    @ApiProperty({
        description: 'La descripción del curso',
        example: 'Aprende los fundamentos de Angular y cómo construir aplicaciones web interactivas.',
    })
    description: string;
    
    @ApiProperty({
        description: 'La URL del video del curso. Opcional.',
        example: 'https://example.com/video.mp4',
        required: false,
        nullable: true,
    })
    video?: string;
}
