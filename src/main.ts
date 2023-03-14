// Nest imports
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

// Files import
import { AppModule } from './bootstrap/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  initializeSwagger(app);
  await app.listen(process.env.API_PORT);
}

async function initializeSwagger(app: INestApplication) {
  const config: any = new DocumentBuilder()
    .setTitle('Beskar API')
    .setDescription('Beskar API Documentation')
    .setVersion('1.0.0')
    .addTag('Beskar')
    .addBearerAuth(
      {
        type: 'http',
        name: 'Authorization',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        description: 'Please enter token in following format: Bearer <JWT>',
        in: 'Header'
      },
      'access-token'
    )
    .build();
  
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
