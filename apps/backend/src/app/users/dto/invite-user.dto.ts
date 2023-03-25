import { UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { transform } from 'src/app/common/transform';

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
