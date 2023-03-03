import { Request } from 'express';

export interface User {
    readonly _id: string;
    readonly active: boolean;
    readonly avatar: string;
    readonly bankManagerId: string;
    readonly blocked: boolean;
    readonly companyId: string;
    readonly confirmed: boolean;
    readonly createdAt: Date;
    readonly email: string;
    readonly entityNo: string;
    readonly firstName: string;
    readonly id: string;
    readonly invitedBy: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly mortgageCenter: string;
    readonly officeId: string;
    readonly password: string;
    readonly phone: string;
    readonly phoneConfirmed: boolean;
    readonly roles: string[];
    readonly updatedAt: Date;
}

export interface RequestWithUser extends Request {
    user: User;
}

