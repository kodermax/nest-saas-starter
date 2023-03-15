/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user.input';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@app/auth';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UsersController {
    constructor(private readonly usersServices: UsersService) { }

    @Get()
    findAll() {
        return this.usersServices.getUsers();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.usersServices.deleteUser(id);
    }

    @Post()
    create(@Body() payload: CreateUserInputDto) {
        return this.usersServices.createUser(payload)
    }

}
