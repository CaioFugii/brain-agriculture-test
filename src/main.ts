import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './commons/application/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('Brain Agriculture Documentation')
    .setDescription('Technical test')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
  );

  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
