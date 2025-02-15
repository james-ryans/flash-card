import React from 'react';
import { User } from '../models/user';
import { LoginRequest } from '../requests/auth';

const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthContext = React.createContext<{
  user: User | null;
  verify: () => void;
  onLogin: (request: LoginRequest) => Promise<void>;
  onLogout: () => void;
}>({
  user: null,
  verify: () => {},
  onLogin: async () => {},
  onLogout: () => {},
});

export default AuthContext;
export { useAuth };
