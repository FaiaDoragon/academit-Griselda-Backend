import { ApiProperty } from "@nestjs/swagger";

export class CreateNewArticleDto {
    @ApiProperty()
    sectiontitle: string;
    
    @ApiProperty()
    articletitle: string;

    @ApiProperty()
    description: string;
}
