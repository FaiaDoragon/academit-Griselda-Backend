import { ApiProperty } from "@nestjs/swagger";

export class CreateCursoDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    video?: string;
}