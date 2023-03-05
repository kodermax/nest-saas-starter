import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from '../dto/jwt.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from './password.service';
import { RedisService } from 'src/redis/redis.service';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { Token } from '../models/token.model';
import { SignupInput } from '../dto/signup.input';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly cacheManager: RedisService,
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
    public validateUser(userId: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    public login(user: any) {
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

    public async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const currentHashedRefreshToken = await this.passwordService.hashPassword(refreshToken);
        await this.cacheManager.set(`refresh_token:${userId}`, currentHashedRefreshToken, {
            ttl: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
        });
    }
    private generateAccessToken(payload: { userId: string }): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
        });
    }

    private generateRefreshToken(payload: { userId: string }): string {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig.refreshIn,
        });
    }
    private generateTokens(payload: { userId: string }): Token {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    public async createUser(payload: SignupInput): Promise<Token> {
        const hashedPassword = await this.passwordService.hashPassword(
            payload.password
        );

        try {
            const user = await this.prisma.user.create({
                data: {
                    ...payload,
                    password: hashedPassword,
                    role: 'USER',
                },
            });

            return this.generateTokens({
                userId: user.id,
            });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${payload.email} already used.`);
            }
            throw new Error(e);
        }
    }

}