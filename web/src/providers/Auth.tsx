import React from 'react';
import { AxiosResponse } from 'axios';
import * as auth from '../requests/auth';
import { User } from '../models/user';
import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { AuthContext } from '../contexts/auth';
import Loading from '../pages/Loading';

type AuthProviderProps = {
  children: React.ReactNode;
};

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

type AuthState = {
  status: Status;
  user: User | null;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [{ status, user }, setData] = React.useState<AuthState>({
    status: Status.Idle,
    user: null,
  });

  React.useEffect(() => {
    setData({ user: null, status: Status.Loading });

    auth
      .verify()
      .then((response: AxiosResponse<VerifyResponse>) => {
        if (response.data.statusCode !== 200) {
          throw new Error(response.data.message);
        }
        setData({ user: response.data.data, status: Status.Success });
        return response;
      })
      .catch(() => {
        setData({ user: null, status: Status.Error });
      });
  }, []);

  const login = React.useCallback(
    (request: LoginRequest) => {
      return auth.login(request).then((response: AxiosResponse<LoginResponse>) => {
        setData({ user: response.data.data, status: Status.Success });
        return response;
      });
    },
    [setData],
  );

  const logout = React.useCallback(() => {
    return auth.logout().then(() => {
      setData({ user: null, status: Status.Idle });
    });
  }, [setData]);

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  if (status === Status.Idle || status === Status.Loading) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
