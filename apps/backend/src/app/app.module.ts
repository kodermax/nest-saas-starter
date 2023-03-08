import { PasswordService } from './auth/services/password.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaModule } from './prisma/prisma.module';
import config from './common/configs/config';

@Module({
  imports: [AuthModule, AccountsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env', '.env.local'],
    load: [config]
  }), RedisModule, PrismaModule],
  controllers: [AppController],
  providers: [
    PasswordService, AppService],
})
export class AppModule { }
