import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/app/prisma/prisma.module';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '@app/auth';

@Module({
    imports: [AuthModule, MailModule, UsersModule, PrismaModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule { }
