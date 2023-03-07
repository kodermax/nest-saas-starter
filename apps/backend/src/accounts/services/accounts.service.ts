/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/services/password.service';
import { RegisterInput } from '../dto/register.input';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {

    constructor(private readonly prisma: PrismaService, private readonly passwordService: PasswordService) { }

    public async createUser(payload: RegisterInput): Promise<User> {
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
            return user;
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
