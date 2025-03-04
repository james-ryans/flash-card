import React from 'react';
import { User } from '../models/user';
import { LoginRequest, RegisterRequest } from '../models/auth';

const AuthContext = React.createContext<{
  user: User | null;
  login: (request: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;
  register: (request: RegisterRequest) => Promise<User>;
  googleSignIn: () => Promise<User>;
}>({
  user: null,
  login: () => Promise.resolve({} as User),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve({} as User),
  googleSignIn: () => Promise.resolve({} as User),
});
AuthContext.displayName = 'AuthContext';

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, useAuth };
