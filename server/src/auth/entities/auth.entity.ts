import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsEmailUnique } from "src/decorators/isEmailUnique.decorator";
import { Match } from "src/decorators/match.decorator";

export class AuthUser {
    name: string;
    email: string;

    constructor(user: Express.User) {
        this.name = user.name;
        this.email = user.email;
    }
}

export interface LoginResponse {
    data?: AuthUser;
    message: string;
    statusCode: number;
}

export class RegisterRequest {
    @IsNotEmpty()
    name: string;
    @IsEmailUnique()
    @IsEmail({}, { message: 'must be an email'})
    @IsNotEmpty()
    email: string;
    @MaxLength(128)
    @MinLength(6)
    password: string;
    @Match('password', { message: 'passwords do not match' })
    @IsNotEmpty({ message: 'password confirmation is required' })
    password_confirmation: string;
}

export interface RegisterResponse {
    data?: AuthUser;
    message: string;
    statusCode: number;
}

export interface VerifyResponse {
    data?: AuthUser;
    message: string;
    statusCode: number;
}
