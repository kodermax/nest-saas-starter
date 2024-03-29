/*
https://docs.nestjs.com/providers#services
*/

import { PrismaService } from '@app/prisma';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTenantInput } from '../dto/create-tenant.input';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TenantsService {

    constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) { }

    public async checkAvailability(domain: string) {
        const tenant = await this.prisma.tenant.findFirst({ where: { domain: domain } })
        return tenant === null
    }

    public async createTenant(payload: CreateTenantInput) {
        try {
            const domain = payload.domain + '.vercel.app';
            await lastValueFrom(this.httpService.post(`https://api.vercel.com/v10/projects/prj_PamUX1FfdKUIkyTEhBHWOpo43YMY/domains`, {
                name: domain
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
                }
            }))

            const tenant = await this.prisma.tenant.create({
                data: {
                    ...payload,
                    domain
                },
            });
            return tenant;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002' || e?.response.status === 409
            ) {
                throw new ConflictException(`Домен ${payload.domain} уже используется.`);
            }
            console.log(e)
            throw new BadRequestException();
        }
    }

    public async getTenant(id: string) {
        return this.prisma.tenant.findFirst({ where: { id: id } });
    }

    public async getTenantByDomain(domain: string) {
        return this.prisma.tenant.findFirst({ where: { domain } })
    }
}
