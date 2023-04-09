import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { CorsConfig, NestConfig, SwaggerConfig } from '@app/common';
import { PrismaService } from '@app/prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AccountModule);
  app.useGlobalPipes(new ValidationPipe());

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle('Account Service')
      .setDescription('Account Service API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin || 'vercel.app'.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
  }
  if (configService.get<boolean>('production')) {
    app.use(helmet());
  }
  app.use(cookieParser());
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
