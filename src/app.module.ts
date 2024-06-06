import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeadersModule } from './headers/headers.module';
import { Header } from './headers/entities/header.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { MainArticleModule } from './main-article/main-article.module';
import { MainArticle } from './main-article/entities/main-article.entity';
import { NewArticleModule } from './new-article/new-article.module';
import { NewArticle } from './new-article/entities/new-article.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta ConfigService en la configuración asíncrona
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), // Obtiene las variables de entorno de forma segura
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Header, Article, MainArticle, NewArticle],
        synchronize: true, // No usar en producción, puede perder datos
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // ruta de la carpeta de imágenes
      serveRoot: '/uploads', // ruta base desde donde se servirán las imágenes
    }),
    ArticlesModule,
    HeadersModule,
    MainArticleModule,
    NewArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
