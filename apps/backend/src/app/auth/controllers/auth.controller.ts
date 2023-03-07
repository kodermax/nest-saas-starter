import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthStateDto } from '../dto/state.dto';

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
        await this.authService.setCurrentRefreshToken(refreshToken, user.id);
        const cookies = [accessTokenCookie, refreshTokenCookie];
        request.res.setHeader('Set-Cookie', cookies);
        return response.send(user);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить состояние авторизации' })
    @ApiOkResponse({ type: AuthStateDto })
    getState(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        return response.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            role: user.role,
            email: user.email,
            phone: user.phone
        });
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Разлогиниться' })
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        if (request?.user) {
            await this.authService.removeRefreshToken(request.user.id);
        }
        const cookies = this.authService.getCookiesForLogOut();
        request.res.setHeader('Set-Cookie', cookies);
        return response.send({ loggedIn: false });
    }

}
