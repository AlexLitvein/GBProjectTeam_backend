import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = {
  swaggerOptions: {
    authAction: {
      defaultBearerAuth: {
        name: 'defaultBearerAuth',
        schema: {
          description: 'Authorization: Bearer <токен>',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        value:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzNjMmYxNTNjMGY1NzJlZDAxYmMwM2MiLCJlbWFpbCI6ImR1Y2tAZ21haWwuY29tIiwiaWF0IjoxNjY0ODg4NTk3LCJleHAiOjE2NjU0ODg1Mzd9.O1i5CT5bUu0_RCnx1C_anDZnyTP4vilCp66PS-jfG0U',
      },
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .setTitle('GBProjectTeam')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
  // INFO: сохранить данные свагера например для импорта в постман
  // writeFile('./test.api.json', JSON.stringify(document));

  await app.listen(3333);
}
bootstrap();
