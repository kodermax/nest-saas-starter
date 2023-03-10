import { Exclude } from "class-transformer";
import { Role, User } from '@prisma/client';

export class NewUserDto implements User {
    role: Role;
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

    roles: Role[];

    @Exclude()
    password: string;
}