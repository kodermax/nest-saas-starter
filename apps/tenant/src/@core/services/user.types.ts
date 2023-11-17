
export enum UserRole {
    Admin = 'Admin',
    User = 'User'
}

export interface User {
    id: string
    firstName: string
    lastName: string
    middleName: string
    name: string
    roles: UserRole[]
    email: string
    displayName?: string
    photoURL?: string
    phoneNumber?: string
    country?: string
    address?: string
    state?: string
    city?: string
    zipCode?: string
    about?: string
    isPublic?: boolean
}