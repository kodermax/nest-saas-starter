import { NoteModule } from './note/note.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaModule } from './prisma/prisma.module';
import config from '../../../libs/common/src/configs/config';
import configProd from '../../../libs/common/src/configs/config.prod';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from 'apps/api-admin/src/auth';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NoteModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('throttle'),
    }),
    AuthModule,
    AccountsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [process.env.NODE_ENV === 'production' ? configProd : config]
    }),
    RedisModule,
    PrismaModule,
    NoteModule,
    NotesModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
