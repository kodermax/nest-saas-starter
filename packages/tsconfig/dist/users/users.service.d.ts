export type User = any;
export declare class UsersService {
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
}
