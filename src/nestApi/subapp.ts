import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './shared/transform.interceptor';
import platformMiddleware from './shared/platform.middleware';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(platformMiddleware)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())


  const options = new DocumentBuilder()
    .setTitle('Vue Storefront API')
    .setDescription('Lorem')
    .setVersion('1.0')
    .setBasePath('/api/v2')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);
  return app
}