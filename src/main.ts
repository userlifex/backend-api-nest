import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
  });

  //app.use(express.static(join(__dirname, '../public')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  //app.useStaticAssets(join(__dirname, '..', '/public'), { prefix: '/public/' });

  const joi = join(process.cwd(), '.' + '/public');
  console.log({ joi });
  app.use(express.static(joi));

  await app.listen(3000);
}
bootstrap();
