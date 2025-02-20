import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';

function login(request: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
  return axios.post(import.meta.env.VITE_SERVER_BASE_URL + '/auth/login', request, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
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
