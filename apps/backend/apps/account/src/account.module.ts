import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from '@app/auth';
import configProd from '@app/common/configs/config.prod';
import config from '@app/common/configs/config';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MailModule } from '@app/mail';
import { JwtModule } from '@nestjs/jwt';
import { SecurityConfig } from '@app/common';
import { JwtRegStrategy } from './strategies/reg.stragegy';
import { IndexController } from './controllers/index.controller';

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
    }),
    MailModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_REGISTER_TOKEN_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AccountController, TenantsController, IndexController],
  providers: [AccountService, TenantsService, JwtRegStrategy],
})
export class AccountModule { }
