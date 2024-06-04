import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
    .setTitle('Academit-Griselda API')
    .setDescription('The Academit API documentation')
    .setVersion('1.0')
    .addTag('academit')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
