import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],

})
export class PrismaModule { }
