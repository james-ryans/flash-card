import React from 'react';
import { User } from '../models/user';
import { LoginRequest } from '../models/auth';

const AuthContext = React.createContext<{
  user: User | null;
  verify: () => Promise<void>;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  verify: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
AuthContext.displayName = 'AuthContext';

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, useAuth };
