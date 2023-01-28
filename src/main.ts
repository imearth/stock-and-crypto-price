import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('stock-and-crypto price')
      .setDescription('stock and crypto price api with nest.')
      .setVersion('0.0.1')
      .build(),
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
