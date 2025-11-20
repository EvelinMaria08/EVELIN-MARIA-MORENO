import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Importante de configurar en mi main.ts el ValidationPipe para que haga la transformación 
  // de los datos de las consultas.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
