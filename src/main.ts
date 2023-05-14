import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/interceptors/response.wrap.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
