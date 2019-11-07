import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './shared/transform.interceptor';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())

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