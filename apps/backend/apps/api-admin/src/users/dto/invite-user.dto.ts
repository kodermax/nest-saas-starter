import { UserRole } from '@prisma/client';
import { transform } from '@starter/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class InviteUserDto {
    @IsEmail()
    @Transform(transform.toLower)
    @Transform(transform.toTrim)
    email: string;

    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    lastName: string;

    roles: UserRole[];
}
