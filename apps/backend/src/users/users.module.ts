import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';

@Module({
  imports:[AuthModule, PrismaModule],
  providers: [UsersService],
  exports: [UsersService],

})
export class UsersModule { }
