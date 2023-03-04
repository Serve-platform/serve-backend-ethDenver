import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const serverPort = configService.get('serverPort');
  const nodeEnv = configService.get('nodeEnv');
  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('EthDenver Backend API Docs')
    .setDescription('Ether Denver API 리스트')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }, // swagger definitions 제거
  });

  await app.listen(serverPort);
  console.log(`port: ${serverPort}, NODE_ENV: ${nodeEnv}`);
}
bootstrap();
