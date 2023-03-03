import { ConfigService } from '@nestjs/config';
export declare class PasswordService {
    private configService;
    constructor(configService: ConfigService);
    private get bcryptSaltRounds();
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
