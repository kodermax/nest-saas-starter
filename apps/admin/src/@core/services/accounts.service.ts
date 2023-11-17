import { IsEmail, IsString, MinLength } from 'class-validator';
import { http } from './http'

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

export const register = (payload: RegisterInput) => {
    return http.post('accounts/register', payload)
}


export const requestPasswordReset = (payload: RequestPasswordResetInput) => {
    return http.post('accounts/request-password-reset', payload)
}

export const resetPassword = (payload: ResetPasswordInput) => {
    return http.post('accounts/reset-password', payload)
}