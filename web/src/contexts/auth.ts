import React from 'react';
import { User } from '../models/user';
import { LoginRequest } from '../models/auth';

const AuthContext = React.createContext<{
  user: User | null;
  login: (request: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<User>;
}>({
  user: null,
  login: () => Promise.resolve({} as User),
  logout: () => Promise.resolve(),
  googleSignIn: () => Promise.resolve({} as User),
});
AuthContext.displayName = 'AuthContext';

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, useAuth };
