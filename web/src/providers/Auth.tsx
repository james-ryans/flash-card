import React from 'react';
import { AxiosResponse } from 'axios';
import * as auth from '../requests/auth';
import { User } from '../models/user';
import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { AuthContext } from '../contexts/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);

  const verify = React.useCallback(() => {
    return auth.verify().then((response: AxiosResponse<VerifyResponse>) => {
      setUser(response.data.data);
    });
  }, [setUser]);

  const login = React.useCallback(
    (request: LoginRequest) => {
      return auth.login(request).then((response: AxiosResponse<LoginResponse>) => {
        setUser(response.data.data);
      });
    },
    [setUser],
  );

  const logout = React.useCallback(() => {
    return auth.logout().then(() => {
      setUser(null);
    });
  }, [setUser]);

  const value = React.useMemo(
    () => ({
      user,
      verify,
      login,
      logout,
    }),
    [user, verify, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
