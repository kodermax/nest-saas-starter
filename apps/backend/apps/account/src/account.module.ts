import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from '@app/auth';
import { ConfigModule } from '@nestjs/config';
import configProd from '@app/common/configs/config.prod';
import config from '@app/common/configs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/account/.env', 'apps/account/.env.local'],
      load: [process.env.NODE_ENV === 'production' ? configProd : config]
    }),
    PrismaModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule { }
