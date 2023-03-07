import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInput {

    firstName: string;

    lastName?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}