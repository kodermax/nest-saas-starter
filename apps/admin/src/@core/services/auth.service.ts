import { http } from './http'
import { User } from './user.types'


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
