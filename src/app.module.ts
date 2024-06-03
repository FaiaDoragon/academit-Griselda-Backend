import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeadersModule } from './headers/headers.module';

@Module({
  imports: [HeadersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
