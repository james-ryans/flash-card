import React from 'react';
import * as auth from '../requests/auth';
import { User } from '../models/user';
import { LoginRequest, LoginResponse, VerifyResponse } from '../models/auth';
import { AuthContext } from '../contexts/auth';
import Loading from '../pages/Loading';
import { Flex } from '@radix-ui/themes';

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
    setData({ user, status: Status.Loading });
    auth
      .verify()
      .then((response: VerifyResponse) => {
        if (response.statusCode !== 200) {
          throw new Error(response.message);
        }
        setData({ user: response.data, status: Status.Success });
        return response;
      })
      .catch(() => {
        setData({ user: null, status: Status.Error });
      });
  }, []);

  const login = React.useCallback(
    (request: LoginRequest) => {
      return auth
        .login(request)
        .then((response: LoginResponse) => {
          setData({ user: response.data, status: Status.Success });
          return response.data;
        })
        .catch((error) => {
          setData({ user: null, status: Status.Error });
          throw error;
        });
    },
    [setData],
  );

  const logout = React.useCallback(() => {
    return auth
      .logout()
      .then(() => {
        setData({ user: null, status: Status.Success });
      })
      .catch(() => {
        setData({ user, status: Status.Error });
      });
  }, [setData]);

  const googleSignIn = React.useCallback(() => {
    return auth
      .googleSignIn()
      .then((response: LoginResponse) => {
        setData({ user: response.data, status: Status.Success });
        return response.data;
      })
      .catch((error) => {
        setData({ user: null, status: Status.Error });
        throw error;
      });
  }, [setData]);

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      googleSignIn,
    }),
    [user, login, logout, googleSignIn],
  );

  if (status === Status.Idle || status === Status.Loading) {
    return (
      <Flex minHeight="100vh">
        <Loading />
      </Flex>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
