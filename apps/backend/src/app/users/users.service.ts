import { Injectable, BadRequestException } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserInputDto } from './dto/create-user.input';
import { PasswordService } from '@app/auth';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }

    public async createUser(payload: CreateUserInputDto) {
        const user = await this.prisma.user.create({
            data: {
                ...payload,
            },
        });
        return user;
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

    public getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    public updateUser(userId: string, newUserData: UpdateUserInput) {
        return this.prisma.user.update({
            data: newUserData,
            where: {
                id: userId,
            },
        });
    }

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

    public async deleteUser(id: string) {
        return this.prisma.user.delete({ where: { id } })
    }
}