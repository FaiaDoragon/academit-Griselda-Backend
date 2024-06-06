import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHeaderItemDto } from './create-header.dto';

export class UpdateHeaderDto extends PartialType(CreateHeaderItemDto) {
    @ApiProperty()
    item1?: string;

    @ApiProperty()
    item2?: string;

    @ApiProperty()
    item3?: string;

    @ApiProperty()
    item4?: string;

    @ApiProperty()
    logo?: string;
}
