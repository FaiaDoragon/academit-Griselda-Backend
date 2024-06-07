import { Module } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { HeadersController } from './headers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfigImages } from '../multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([Header]),
  MulterModule.register({ ...multerConfigImages }),
],
  controllers: [HeadersController],
  providers: [HeadersService],
})
export class HeadersModule {}
