import { http } from './http.service'
import { User } from './user.types'


export interface LoginInput {
    email: string
    password: string
}
export const login = (payload: LoginInput) => http.post<User>('auth/login', payload)

export const authMe = () => http.get<User>('auth/me')

export const logout = () => http.post('auth/logout')
