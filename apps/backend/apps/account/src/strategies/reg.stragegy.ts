import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RequestUser } from '@app/auth/interfaces/user';
import { JwtPayload } from '@app/auth/models/jwt-payload';
import { AuthService } from '@app/auth';

@Injectable()
export class JwtRegStrategy extends PassportStrategy(Strategy, 'jwt-reg') {
    constructor(readonly config: ConfigService, readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.RegToken;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_REGISTER_TOKEN_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<Partial<RequestUser> | null> {
        if (payload.aud !== this.config.get('siteUrl')) return null;
        const user = await this.authService.validateUser(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email
        };
    }
}