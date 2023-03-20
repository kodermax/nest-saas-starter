import { http } from "./http"
import { User } from "./user.types"

export interface UserList {
    data: User[];
    totalCount: number;
}

export const deleteUser = (id: string) => {
    return http.delete(`users/${id}`)
}

export const getUsers = () => {
    return http.get<UserList>('users')
}

export const inviteUser = (data: any) => {
    return http.post('users/invite', data)
}