import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {

    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;
    
    @ApiProperty()
    video?: string;
}