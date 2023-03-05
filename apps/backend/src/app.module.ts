import { PasswordService } from './auth/services/password.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    envFilePath: ['.env.development.local', '.env.development', '.env'],
    isGlobal: true,
  }), RedisModule],
  controllers: [AppController],
  providers: [
    PasswordService, AppService, PrismaService],
})
export class AppModule { }
