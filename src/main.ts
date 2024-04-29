import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger auth config
  const configService = app.get(ConfigService);
  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [configService.getOrThrow<string>('SWAGGER_USER')]:
          configService.getOrThrow<string>('SWAGGER_PASSWORD'),
      },
    }),
  );
  // set swagger config
  const config = new DocumentBuilder()
    .setTitle('Boggle API')
    .setDescription('The Boggle API description')
    .setVersion('2024.4')
    .addTag('boggle')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // start server
  await app.listen(3000);
}
bootstrap();
