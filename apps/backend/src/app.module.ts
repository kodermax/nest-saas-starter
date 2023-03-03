import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import config from './common/configs/config';

@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
