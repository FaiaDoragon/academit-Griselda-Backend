import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Academit-Griselda</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Bienvenido a Academit-Griselda!</h1>
          <p>Academit-Griselda es una plataforma educativa innovadora que impulsa el aprendizaje continuo y el crecimiento profesional. Nuestra API ofrece acceso a una amplia gama de recursos educativos, incluyendo cursos interactivos, artículos informativos y noticias relevantes sobre tecnología, negocios y más.</p>
          <p>Con Academit-Griselda, puedes explorar y descubrir contenido de alta calidad para mejorar tus habilidades y mantenerte al día con las últimas tendencias en el mundo digital. Únete a nuestra comunidad y lleva tu aprendizaje al siguiente nivel.</p>
          <p>Explora nuestra <a href="/api">API</a> para más detalles.</p>
        </div>
      </body>
      </html>
    `;
  }
}
