import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { PrismaClientManager } from './prisma-client-manager';
import { Request } from 'express';

const prismaClientProvider: FactoryProvider<PrismaClient> = {
  provide: PrismaClient,
  scope: Scope.REQUEST,
  inject: [REQUEST, PrismaClientManager],
  useFactory: (request: Request, manager: PrismaClientManager) =>
    manager.getClient(request),
};

@Global()
@Module({
  providers: [PrismaService, prismaClientProvider],
  exports: [PrismaService],

})
export class PrismaModule { }
