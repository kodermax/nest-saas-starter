import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from 'src/auth/services/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }

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
}