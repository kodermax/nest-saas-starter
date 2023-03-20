import { Exclude } from "class-transformer";
import { Role, User } from '@prisma/client';

export class NewUserDto implements User {

    @Exclude()
    createdAt: Date;

    email: string;

    firstName: string;
    id: string;

    lastName: string;

    middleName: string;

    @Exclude()
    password: string;

    phone: string;
    role: Role;

    roles: Role[];

    @Exclude()
    updatedAt: Date;
}