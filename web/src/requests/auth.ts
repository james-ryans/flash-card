import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { get, post } from './common';

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

function googleSignIn(): Promise<LoginResponse> {
  return get('/auth/google');
}

export { login, logout, verify, googleSignIn };
