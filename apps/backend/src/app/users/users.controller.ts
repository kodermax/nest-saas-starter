/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) {

    }

    @Get()
    async getUsers() {
        return this.usersServices.getUsers();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        this.usersServices.deleteUser(id);
    }
}
