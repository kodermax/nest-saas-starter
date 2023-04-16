import { PrismaService } from '@app/prisma';
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { RegisterInput } from '../dto/register.input';
import { AuthService, PasswordService } from '@app/auth';
import { RedisService } from '@app/redis';
import { MailService } from '@app/mail';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@app/auth/models/jwt-payload';
import { randomUUID } from 'crypto';
import { RequestUser } from '@app/auth/interfaces/user';
import { CookieOptions } from 'express';

interface CookieValues {
  name: string;
  options: CookieOptions;
  value: string;
}

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly cacheManager: RedisService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly authService: AuthService

  ) {

  }

  public async createUser(payload: RegisterInput, tenantId: string): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );
    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          roles: [UserRole.User],
        },
      });
      try {
        if (tenantId) {
          await this.prisma.tenant.update({ where: { id: tenantId }, data: { createdBy: user.id } })
        }
      }
      catch (e) {

      }
      const code = Math.random().toString().substring(2, 6)
      await this.cacheManager.set(`mail_verify_code:${code}`, user.email, {
        ttl: 604800 * 1000,
      });
      await this.mailService.sendRegisterVerifyCode(user.email, code);
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} уже используется.`);
      }
      throw new Error(e);
    }
  }



  public async existAccount(email: any): Promise<boolean> {
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (user !== null) {
      throw new ConflictException('Этот аккаунт уже используется')
    }
    return false;
  }

  public getAccountRegisterToken(user: User) {
    const payload: JwtPayload = {
      jti: randomUUID(),
      aud: this.config.get('siteUrl'),
      sub: user.id,
    };
    const token = this.generateRegisterToken(payload);
    return token;

  }


  public async getAuthCookies(tenantId: string, user: RequestUser) {
    const res = await this.prisma.tenant.findFirst({ where: { id: tenantId } });
    const tokens = this.authService.generateTokens(user, `https://${res.domain}`);
    const cookies: CookieValues[] = [{
      'name': 'Authentication',
      'value': tokens.accessToken,
      'options': {
        httpOnly: true,
        sameSite: 'none',
        secure: this.config.get('ENVIRONMENT') === 'development' ? false : true,
        path: '/',
        maxAge: 3600 * 3600,
        domain: this.config.get('AUTH_COOKIE_TENANT_DOMAIN')
      }
    },
    {
      'name': 'Refresh',
      'value': tokens.refreshToken,
      'options': {
        httpOnly: true,
        sameSite: 'none',
        secure: this.config.get('ENVIRONMENT') === 'development' ? false : true,
        path: '/',
        maxAge: 3600 * 3600,
        domain: this.config.get('AUTH_COOKIE_TENANT_DOMAIN')
      }
    }]
    return cookies;
  }


  public getHello(): string {
    return 'Hello World!';
  }

  public async verifyEmailCode(code: string) {
    const value = await this.cacheManager.get(`mail_verify_code:${code}`);
    return value;
  }

  private generateRegisterToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REGISTER_TOKEN_SECRET'),
      expiresIn: 600
    });
  }
}
