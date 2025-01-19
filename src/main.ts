import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

    const config = new DocumentBuilder()
    .setTitle('API Blog')
    .setDescription(`
      A RESTful API designed for managing a personal blog.
      It allows authenticated users to create, edit, delete, and retrieve blog posts. Each post can include text, images, or videos and is associated with the author's information. The API includes user authentication using JWT and is built with scalability and ease of integration in mind.
      `)
    .setVersion('1.0')
    .addBearerAuth()  
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
