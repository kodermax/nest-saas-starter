/*
https://docs.nestjs.com/providers#services
*/

import { PrismaService } from '@app/prisma';
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTenantInput } from '../dto/create-tenant.input';

@Injectable()
export class TenantsService {
    constructor(private readonly prisma: PrismaService) { }

    public async createTenant(payload: CreateTenantInput) {
        try {
            const tenant = await this.prisma.tenant.create({
                data: {
                    ...payload,
                },
            });
            return tenant;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new ConflictException(`Домен ${payload.domain} уже используется.`);
            }
            throw new Error(e);
        }
    }
}
