import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInput {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}