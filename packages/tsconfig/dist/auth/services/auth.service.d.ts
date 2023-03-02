import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { PasswordService } from './password.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly prisma;
    private readonly passwordService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, prisma: PrismaService, passwordService: PasswordService);
    getCookieWithJwtAccessToken(userId: string): string;
    getCookieWithJwtRefreshToken(userId: string): {
        cookie: string;
        token: string;
    };
    validateUserPassword(email: string, password: string): Promise<boolean>;
    validateUser(userId: string): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    private getCookieDomain;
}
