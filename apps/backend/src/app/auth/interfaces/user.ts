import { Role } from '@prisma/client';
import { Request } from 'express';

export interface User {
    readonly createdAt: Date;
    readonly email: string;
    readonly firstName: string;
    readonly id: string;
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
    email?: string;
    firstName?: string;
    id: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    roles: Role[];
}