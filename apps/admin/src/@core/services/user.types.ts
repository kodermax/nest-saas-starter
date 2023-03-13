
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