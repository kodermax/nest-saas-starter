import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupInput {

    firstName: string;

    lastName?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}