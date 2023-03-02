import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupInput {

    firstName?: string;

    lastName?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}