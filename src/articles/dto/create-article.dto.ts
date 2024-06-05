import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image?: string;
}
