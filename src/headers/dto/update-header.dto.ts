import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHeaderItemDto } from './create-header.dto';

export class UpdateHeaderDto extends PartialType(CreateHeaderItemDto) {

}
