import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNewArticleDto } from './create-new-article.dto';

export class UpdateNewArticleDto extends PartialType(CreateNewArticleDto) {
    @ApiProperty()
    sectiontitle?: string;
    
    @ApiProperty()
    articletitle?: string;

    @ApiProperty()
    description?: string;
}
