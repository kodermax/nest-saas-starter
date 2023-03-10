import { http } from './http'


export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER'
}

export interface User {
    id: string
    firstName: string
    lastName: string
    middleName: string
    name: string
    roles: UserRole[]
    email: string
}
export interface LoginInput {
    email: string
    password: string
}
export const login = (payload: LoginInput) => {
    return http.post<User>('auth/login', payload)
}

export const authMe = () => {
    return http.get<User>('auth/me')
}

export const logout = () => {
    return http.post('auth/logout')
}
