import { SuccessResponse, Request } from './common';
import { User } from './user';

interface LoginRequest extends Request {
  email: string;
  password: string;
};

interface LoginResponse extends SuccessResponse<User> {};
interface VerifyResponse extends LoginResponse {};

export type { LoginRequest, LoginResponse, VerifyResponse };
