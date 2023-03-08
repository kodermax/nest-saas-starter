import { Module } from '@nestjs/common';
import { AuthModule } from 'src/app/auth/auth.module';
import { PrismaModule } from 'src/app/prisma/prisma.module';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [AuthModule, MailModule, UsersModule, PrismaModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule { }
