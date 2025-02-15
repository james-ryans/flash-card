declare global {
    namespace Express {
        interface User {
            id: string;
            name: string;
            email: string;
            password: string;
            created_at: Date;
            updated_at: Date;
        }
    }
}

export type User = Express.User;

export type PlainUser = Omit<User, 'password'>;
