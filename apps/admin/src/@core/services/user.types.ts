
export enum UserRole {
    Admin = 'Admin',
    User = 'User'
}

export class User {
    id: string
    firstName: string
    lastName: string
    middleName: string
    name: string
    roles: UserRole[]
    email: string
}