import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from 'src/app/auth/auth.module';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
