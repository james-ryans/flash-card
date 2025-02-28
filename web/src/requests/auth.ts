import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { post } from './common';

function login(request: LoginRequest): Promise<LoginResponse> {
  return post('/auth/login', request, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

function logout(): Promise<void> {
  return post('/auth/logout', {}).then();
}

function verify(): Promise<VerifyResponse> {
  return post('/auth/verify', {});
}

export { login, logout, verify };
