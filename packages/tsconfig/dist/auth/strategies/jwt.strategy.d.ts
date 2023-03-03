import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtDto } from '../dto/jwt.dto';
import { User } from '@prisma/client';
import { AuthService } from '../services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly configService: ConfigService;
    readonly authService: AuthService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: JwtDto): Promise<User>;
}
export {};
