/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupInput } from '../dto/signup.input';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from 'src/auth/services/auth.service';
import { Request, Response } from 'express';

@ApiTags('Аккаунты')
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService, private readonly authService: AuthService) { }

    @Post('signup')
    @HttpCode(200)
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiBadRequestResponse({
        description: 'Одно из полей содержит не верные данные',
    })
    @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
    async signup(
        @Req() request: Request,
        @Body() postData: SignupInput,
        @Res() res: Response,
    ) {
        const userId = await this.accountsService.createUser(postData);
        const tokens = this.authService.generateTokens({ userId });
        const cookies = this.authService.getAuthCookies(tokens.accessToken, tokens.refreshToken);
        await this.authService.setCurrentRefreshToken(tokens.refreshToken, userId);

        request.res.setHeader('Set-Cookie', [cookies.accessToken, cookies.refreshToken]);
        res.status(HttpStatus.OK).json({ id: userId });
    }

}
