import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from '@app/auth';
import configProd from '@app/common/configs/config.prod';
import config from '@app/common/configs/config';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/account/.env', 'apps/account/.env.local'],
      load: [process.env.NODE_ENV === 'production' ? configProd : config]
    }),
    PrismaModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [AccountController, TenantsController],
  providers: [AccountService, TenantsService],
})
export class AccountModule { }
