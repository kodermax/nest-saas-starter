import { UserRole, User } from '@prisma/client';

export class NewUserDto implements Partial<User> {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    middleName: string;
    phone: string;
    roles: UserRole[];
}