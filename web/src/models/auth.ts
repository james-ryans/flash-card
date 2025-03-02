import { SuccessResponse, Request } from './common';
import { User } from './user';

interface LoginRequest extends Request {
  email: string;
  password: string;
};

interface LoginResponse extends SuccessResponse<User> {};
interface VerifyResponse extends LoginResponse {};

interface RegisterRequest extends Request {
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegisterResponse extends SuccessResponse<User> {};

export type { LoginRequest, LoginResponse, VerifyResponse, RegisterRequest, RegisterResponse };
