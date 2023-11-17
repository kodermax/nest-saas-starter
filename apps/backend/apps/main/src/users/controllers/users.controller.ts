import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserInputDto } from '../dto/create-user.input';
import { InviteUserDto } from '../dto/invite-user.dto';
import { Roles, RolesGuard } from '@app/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Role } from '@app/auth/enums/role.enum';
import { RequestWithUser } from '@app/auth/interfaces/user';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UsersController {
    constructor(private readonly usersServices: UsersService) { }

    @Post()
    create(@Body() payload: CreateUserInputDto) {
        return this.usersServices.createUser(payload)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.usersServices.deleteUser(id);
    }

    @Get()
    findAll() {
        return this.usersServices.getUsers();
    }

    @Post('invite')
    @ApiOperation({ summary: 'Приглашение пользователя' })
    async inviteUser(@Body() data: InviteUserDto, @Req() request: RequestWithUser) {
        return await this.usersServices.inviteUser(data, request.user);
    }

}
