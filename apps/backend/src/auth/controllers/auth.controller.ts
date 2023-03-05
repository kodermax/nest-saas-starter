import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Авторизация по email' })
    async logIn(
        @Req() request: RequestWithUser,
        @Res() response: Response,
    ) {
        const { user } = request;
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
        const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id);
        console.log(refreshToken);
        await this.authService.setCurrentRefreshToken(refreshToken, user.id);
        const cookies = [accessTokenCookie, refreshTokenCookie];
        request.res.setHeader('Set-Cookie', cookies);
        return response.send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user?.phone || '',
        });
    }

}
