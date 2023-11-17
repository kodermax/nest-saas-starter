/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'libs/common/src/configs/config.interface';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {

    private get bcryptSaltRounds(): string | number {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        const saltOrRounds = securityConfig.bcryptSaltOrRound;

        return Number.isInteger(Number(saltOrRounds))
            ? Number(saltOrRounds)
            : saltOrRounds;
    }
    constructor(private configService: ConfigService) { }

    public hashPassword(password: string): Promise<string> {
        return hash(password, this.bcryptSaltRounds);
    }


    public validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }
}
