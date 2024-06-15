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
import { CursosModule } from './cursos/cursos.module';
import { Curso } from './cursos/entities/curso.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta ConfigService en la configuración asíncrona
      useFactory: async (configService: ConfigService) => {
        const isDevelopment = configService.get<string>('ENV') === 'develop';

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'), // Obtiene las variables de entorno de forma segura
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Header, Article, MainArticle, NewArticle, Curso],
          synchronize: isDevelopment,
          // logging: isDevelopment ? 'all' : ['error'], // Solo loguea todos los queries en desarrollo
          retryAttempts: 5, // Intentos de reintento en caso de fallo de conexión
          retryDelay: 3000, // Milisegundos entre cada intento de reintento
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'), // Ruta de la carpeta de imágenes
      serveRoot: '/uploads/', // Ruta base desde donde se servirán las imágenes
    }),
    ArticlesModule,
    HeadersModule,
    MainArticleModule,
    NewArticleModule,
    CursosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
