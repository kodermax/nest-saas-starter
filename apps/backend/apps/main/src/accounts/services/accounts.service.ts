import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';
import { Prisma, User } from '@prisma/client';
import { UsersService } from '../../users/services/users.service';
import crypto from 'crypto';
import { PrismaService } from '@app/prisma';
import { PasswordService } from '@app/auth/services/password.service';
import { RedisService } from '@app/redis';
import { MailService } from '@app/mail';

@Injectable()
export class AccountsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly usersServices: UsersService,
        private readonly cacheManager: RedisService,
        private readonly mailService: MailService
    ) { }

    public async createUser(payload: RegisterInput): Promise<User> {
        const hashedPassword = await this.passwordService.hashPassword(
            payload.password
        );

        try {
            const user = await this.prisma.user.create({
                data: {
                    ...payload,
                    password: hashedPassword,
                    roles: ['User'],
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


    public async requestPasswordReset(email: string) {
        const user = await this.usersServices.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('We couldn’t find that email. Please try again.');
        }
        const token = crypto.randomBytes(24).toString('hex');
        await this.cacheManager.set(`reset_token:${token}`, user.id, { ttl: 3600000 });
        this.mailService.sendPasswordReset(user.firstName, user.email, token);
    }


    public async resetPassword(token: string, password: string) {
        if (!password) {
            throw new BadRequestException('Не указан пароль!');
        }
        if (!token) {
            throw new BadRequestException('Не указан токен!');
        }
        const userId = await this.cacheManager.get(`reset_token:${token}`);
        if (!userId) {
            throw new NotFoundException('Истёк срок действия токена!');
        }
        const hashedPassword = await this.passwordService.hashPassword(password);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword,
            }
        });
        await this.cacheManager.del(`reset_token:${token}`);
    }

}
