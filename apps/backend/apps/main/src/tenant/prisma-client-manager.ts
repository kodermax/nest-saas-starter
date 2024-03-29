import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
    private clients: { [key: string]: PrismaClient } = {};

    getClient(request: Request): PrismaClient {
        const tenantId = this.getTenantId(request);

        let client = this.clients[tenantId];

        if (!client) {
            const databaseUrl = `${process.env.TENANT_DATABASE_URL}${tenantId}`
            client = new PrismaClient({
                datasources: {
                    db: {
                        url: databaseUrl,
                    },
                },
            });
            this.clients[tenantId] = client;
        }
        return client;
    }

    getTenantId(request: Request): string {
        const tenant: string = request.headers.host.split('.')[0];
        return tenant;
    }



    async onModuleDestroy() {
        await Promise.all(
            Object.values(this.clients).map((client) => client.$disconnect()),
        );
    }
}