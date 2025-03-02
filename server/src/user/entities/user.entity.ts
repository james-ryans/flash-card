declare global {
    namespace Express {
        interface User {
            id: string;
            name: string;
            email: string;
            created_at: Date;
            updated_at: Date;
        }
    }
}

export interface User extends Express.User {}
