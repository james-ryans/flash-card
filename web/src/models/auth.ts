import { User } from './user';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = Response & {
  data: User;
};

type VerifyResponse = LoginResponse;

export type { LoginRequest, LoginResponse, VerifyResponse };