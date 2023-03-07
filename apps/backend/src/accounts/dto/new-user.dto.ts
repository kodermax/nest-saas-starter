import { Exclude } from "class-transformer";
import { Role, User } from '@prisma/client';

export class NewUserDto implements User {
    id: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    email: string;

    firstName: string;

    middleName: string;

    lastName: string;

    phone: string;

    role: Role;

    @Exclude()
    password: string;
}