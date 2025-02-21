export class AuthUser {
    name: string;
    email: string;

    constructor(user: Express.User) {
        this.name = user.name;
        this.email = user.email;
    }
}

export type LoginResponse = {
    data?: AuthUser;
    message: string;
    statusCode: number;
}

export type VerifyResponse = {
    data?: AuthUser;
    message: string;
    statusCode: number;
}
