import { http } from "./http"
import { User } from "./user.types"


export const deleteUser = (id: string) => {
    return http.delete(`users/${id}`)
}

export const getUsers = () => {
    return http.get<User[]>('users')
}