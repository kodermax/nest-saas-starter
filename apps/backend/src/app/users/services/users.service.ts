import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { ChangePasswordInput } from '../dto/change-password.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserInputDto } from '../dto/create-user.input';
import { PasswordService } from '@app/auth';
import { InviteUserDto } from '../dto/invite-user.dto';
import { RequestUser } from 'src/app/auth/interfaces/user';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }

    public async changePassword(
        userId: string,
        userPassword: string,
        changePassword: ChangePasswordInput
    ) {
        const passwordValid = await this.passwordService.validatePassword(
            changePassword.oldPassword,
            userPassword
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }

        const hashedPassword = await this.passwordService.hashPassword(
            changePassword.newPassword
        );

        return this.prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: { id: userId },
        });
    }

    public async createUser(payload: CreateUserInputDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    ...payload,
                },
            });
            return user;
        }
        catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${payload.email} already used.`);
            }
            throw new Error(e);
        }
    }

    public async deleteUser(id: string) {
        return this.prisma.user.delete({ where: { id } })
    }

    public getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }


    public async getUsers() {
        const data = await this.prisma.user.findMany()
        const totalCount = await this.prisma.user.count()
        return {
            data,
            page: 1,
            limit: 15,
            totalCount
        }
    }

    public async inviteUser(data: InviteUserDto, user: RequestUser) {
        const token = crypto.randomBytes(24).toString('hex');
        const newUser = { ...data, invitedBy: user.id, registrationToken: token };
        const createdUser = await this.createUser(newUser);
        return {
            token: token,
            userId: createdUser.id,
        };

    }

    public updateUser(userId: string, newUserData: UpdateUserInput) {
        return this.prisma.user.update({
            data: newUserData,
            where: {
                id: userId,
            },
        });
    }
}