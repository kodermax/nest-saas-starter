import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../models/jwt-payload';
import { RequestUser } from '../interfaces/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly config: ConfigService, readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<RequestUser | null> {
        // TODO: add check aud
        // if (payload.aud !== this.config.get('siteUrl')) return null; 
        const user = await this.authService.validateUser(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user.id,
            roles: user.roles,
        };
    }
}