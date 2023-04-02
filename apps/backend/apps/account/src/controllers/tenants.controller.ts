/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantInput } from '../dto/create-tenant.input';
import { ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenants: TenantsService) { }

    @Post()
    @ApiOperation({ summary: 'Создание сайта пользователя' })
    @ApiConflictResponse({ description: 'Такой домен уже существует' })
    async createTenant(@Body() payload: CreateTenantInput) {
        return this.tenants.createTenant(payload);
    }
}
