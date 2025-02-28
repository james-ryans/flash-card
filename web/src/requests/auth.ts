import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { post } from './common';

function login(request: LoginRequest): Promise<LoginResponse> {
  return post('/auth/login', request, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

function logout(): Promise<AxiosResponse<void>> {
  return axios.post(
    import.meta.env.VITE_SERVER_BASE_URL + '/auth/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function verify(): Promise<AxiosResponse<VerifyResponse>> {
  return axios.post(
    import.meta.env.VITE_SERVER_BASE_URL + '/auth/verify',
    {},
    {
      withCredentials: true,
    },
  );
}

export { login, logout, verify };
