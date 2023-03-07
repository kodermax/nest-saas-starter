/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterInput } from '../dto/register.input';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Request, Response } from 'express';
import { NewUserDto } from '../dto/new-user.dto';
import { classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';

@ApiTags('Аккаунты')
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService, private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(200)
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiBadRequestResponse({
        description: 'Одно из полей содержит не верные данные',
    })
    @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
    async register(
        @Req() request: Request,
        @Body() postData: RegisterInput,
        @Res() res: Response,
    ) {
        const user = await this.accountsService.createUser(postData);
        const tokens = this.authService.generateTokens({ userId: user.id });
        const cookies = this.authService.getAuthCookies(tokens.accessToken, tokens.refreshToken);
        await this.authService.setCurrentRefreshToken(tokens.refreshToken, user.id);
        request.res.setHeader('Set-Cookie', [cookies.accessToken, cookies.refreshToken]);
        const newUser = plainToInstance(NewUserDto, user);
        res.status(HttpStatus.OK).json(newUser);
    }

}
