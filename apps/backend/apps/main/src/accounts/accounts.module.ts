import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '@app/auth';
import { PrismaModule } from '@app/prisma';

@Module({
    imports: [AuthModule, MailModule, UsersModule, PrismaModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule { }
