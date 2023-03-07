import { Module } from '@nestjs/common';
import { AuthModule } from 'src/app/auth/auth.module';
import { PrismaModule } from 'src/app/prisma/prisma.module';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';

@Module({
    imports: [AuthModule, PrismaModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule { }
