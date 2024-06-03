import { Module } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { HeadersController } from './headers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Header } from './entities/header.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Header])],
  controllers: [HeadersController],
  providers: [HeadersService],
})
export class HeadersModule {}
