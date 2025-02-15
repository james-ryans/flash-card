import axios from 'axios';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = Response;

async function login(request: LoginRequest) {
  return await axios.post(import.meta.env.VITE_SERVER_BASE_URL + '/auth/login', request, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

async function verify() {
  return await axios.post(import.meta.env.VITE_SERVER_BASE_URL + '/auth/verify', {
    withCredentials: true,
  });
}

export { login, verify };
export type { LoginRequest, LoginResponse };
