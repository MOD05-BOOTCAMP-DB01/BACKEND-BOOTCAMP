import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, {
    logger,
    cors: {
      origin: ['http://localhost:3001'],
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Okr API')
    .setDescription('API criada para um sistema de OKRs, utilizando NestJS, TypeORM, PostgreSQL e Docker. Nesta API é possível criar usuários, objetivos e key-results. Bem como fazer consultas por ID.')
    .setVersion('1.0')
    //.addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
