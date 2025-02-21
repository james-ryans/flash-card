import React from 'react';
import { User } from '../models/user';
import { LoginRequest, LoginResponse } from '../models/auth';
import { AxiosResponse } from 'axios';

const AuthContext = React.createContext<{
  user: User | null;
  login: (request: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: () => Promise.resolve({} as AxiosResponse<LoginResponse>),
  logout: () => Promise.resolve(),
});
AuthContext.displayName = 'AuthContext';

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, useAuth };
