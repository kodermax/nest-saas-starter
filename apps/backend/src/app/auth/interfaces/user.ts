import { Role } from '@prisma/client';
import { Request } from 'express';

export interface User {
    readonly id: string;
    readonly createdAt: Date;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly password: string;
    readonly phone: string;
    readonly role: string;
    readonly updatedAt: Date;
}

export interface RequestWithUser extends Request {
    user: RequestUser;
}


export class RequestUser {
    id: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    phone?: string;
    roles: Role[];
}