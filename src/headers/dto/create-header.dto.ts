import { ApiProperty } from '@nestjs/swagger';

export class CreateHeaderItemDto {
  @ApiProperty()
  item1: string;

  @ApiProperty()
  item2?: string;

  @ApiProperty()
  item3?: string;

  @ApiProperty()
  item4?: string;

  @ApiProperty()
  logo?: Buffer;
}
