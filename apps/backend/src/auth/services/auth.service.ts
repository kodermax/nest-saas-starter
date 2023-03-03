import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from '../dto/jwt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService
    ) { }

    public getCookieWithJwtAccessToken(userId: string) {
        const payload: JwtDto = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`,
        });
        return `Authentication=${token}; HttpOnly; Domain=${this.getCookieDomain()}; ${this.configService.get('SECURE_COOKIE') === 'true' ?
            'SameSite=None;' : ''
            } ${this.configService.get('SECURE_COOKIE') === 'true' ? 'Secure;' : ''} Path=/; Max-Age=${this.configService.get(
                'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            )}`;
    }

    public getCookieWithJwtRefreshToken(userId: string) {
        const payload: JwtDto = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
        });
        const cookie = `Refresh=${token}; HttpOnly; Domain=${this.getCookieDomain()}; ${this.configService.get('SECURE_COOKIE') === 'true'
            ? 'SameSite=None;' : ''
            } ${this.configService.get('SECURE_COOKIE') === 'true' ? 'Secure;' : ''} Path=/; Max-Age=${this.configService.get(
                'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
            )}`;
        return {
            cookie,
            token,
        };
    }

    public async validateUserPassword(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const passwordValid = await this.passwordService.validatePassword(
            password,
            user.password
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }
        return true;
    }
    validateUser(userId: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private getCookieDomain() {
        switch (this.configService.get('ENVIRONMENT')) {
            case 'production':
                return this.configService.get('AUTH_COOKIE_DOMAIN');
            case 'staging':
                return this.configService.get('AUTH_COOKIE_DOMAIN');
            default:
                return 'localhost';
        }
    }
}