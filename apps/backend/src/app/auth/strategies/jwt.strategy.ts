import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtDto } from '../dto/jwt.dto';
import { User } from '@prisma/client';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService, readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: JwtDto): Promise<User> {
        const user = await this.authService.validateUser(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}