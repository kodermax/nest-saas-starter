import { PasswordService } from 'src/auth/services/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private prisma;
    private passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    updateUser(userId: string, newUserData: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    changePassword(userId: string, userPassword: string, changePassword: ChangePasswordInput): Promise<import(".prisma/client").User>;
}
