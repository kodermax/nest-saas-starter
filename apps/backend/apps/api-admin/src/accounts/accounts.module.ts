import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from 'apps/api-admin/src/auth';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [AuthModule, MailModule, UsersModule, PrismaModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule { }
