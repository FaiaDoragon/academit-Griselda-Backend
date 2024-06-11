import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });

  const apiDescription = `
  Academit-Griselda es una plataforma educativa innovadora que impulsa el aprendizaje continuo y el crecimiento profesional. Nuestra API ofrece acceso a una amplia gama de recursos educativos, incluyendo cursos interactivos, artículos informativos y noticias relevantes sobre tecnología, negocios y más.

  Con Academit-Griselda, puedes explorar y descubrir contenido de alta calidad para mejorar tus habilidades y mantenerte al día con las últimas tendencias en el mundo digital. Únete a nuestra comunidad y lleva tu aprendizaje al siguiente nivel.
  `;

  const config = new DocumentBuilder()
    .setTitle('Academit-Griselda API')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .addTag('academit')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
