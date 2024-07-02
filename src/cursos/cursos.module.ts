import { Module } from '@nestjs/common';
import { CursosService } from './servicio/cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfigVideos } from '../multer.config';
import { entites } from "../shared/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([...entites]),
    MulterModule.register({ ...multerConfigVideos }),
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
