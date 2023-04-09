/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantInput } from '../dto/create-tenant.input';
import { ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckAvailabilityDto } from '../dto/check-availability.dto';
import { Request, Response } from 'express';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenants: TenantsService) { }

    @Post('check-availability')
    @HttpCode(200)
    @ApiOperation({ summary: '' })
    async checkAvailability(@Body() payload: CheckAvailabilityDto) {
        const result = await this.tenants.checkAvailability(payload.domain)
        return { status: result === true ? 'available' : 'unavailable' }
    }

    @Post()
    @ApiOperation({ summary: 'Создание сайта пользователя' })
    @ApiConflictResponse({ description: 'Такой домен уже существует' })
    async createTenant(@Body() payload: CreateTenantInput, @Res({ passthrough: true }) response: Response) {
        const tenant = await this.tenants.createTenant(payload);
        response.cookie('tenantId', tenant.id);
        return tenant;
    }

    @Get('me')
    @ApiOperation({ summary: 'Возвращает ссылку на текущий сайт' })
    async getCurrentTenant(@Req() request: Request) {
        const tenant = await this.tenants.getTenant(request.cookies['tenantId']);
        return { siteUrl: `https://${tenant.domain}` }
    }
}
