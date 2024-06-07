import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Curso } from './entities/curso.entity';
import { multerConfigVideos } from '../multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([Curso]),
  MulterModule.register({ ...multerConfigVideos }),],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
