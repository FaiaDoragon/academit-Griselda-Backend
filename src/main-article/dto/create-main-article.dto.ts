import { ApiProperty } from "@nestjs/swagger";

export class CreateMainArticleDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    textButton: string;

    @ApiProperty()
    imageUrl?: string;
}
