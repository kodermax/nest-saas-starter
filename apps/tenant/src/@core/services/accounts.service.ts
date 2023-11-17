import { IsEmail, IsString, MinLength } from 'class-validator';
import { http } from './http.service'

export class RegisterInput {
    @MinLength(2)
    firstName: string;

    @MinLength(2)
    lastName: string;

    @IsEmail()
    email: string;

    @MinLength(5)
    password: string
}

export class RequestPasswordResetInput {
    @IsEmail()
    email: string;
}

export class ResetPasswordInput {
    @IsString()
    token: string;

    @MinLength(5)
    password: string;
}

export const register = (payload: RegisterInput) => http.post('accounts/register', payload)


export const requestPasswordReset = (payload: RequestPasswordResetInput) => http.post('accounts/request-password-reset', payload)

export const resetPassword = (payload: ResetPasswordInput) => http.post('accounts/reset-password', payload)