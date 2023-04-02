import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from '@app/prisma';
import { NoteModule } from './note/note.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@app/auth';
import { NotesModule } from './notes/notes.module';
import { AccountsModule } from './accounts/accounts.module';
import configProd from '@app/common/configs/config.prod';
import config from '@app/common/configs/config';

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
  controllers: [MainController],
  providers: [
    MainService
  ],
})
export class MainModule { }
