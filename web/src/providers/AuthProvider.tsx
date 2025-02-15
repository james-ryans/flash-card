import React from 'react';
import { User } from '../models/user';
import { login, LoginRequest, LoginResponse, verify, VerifyResponse } from '../requests/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse, useNavigate } from 'react-router';
import AuthContext from '../contexts/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  const handleVerify = async () => {
    verify()
      .then((response: AxiosResponse<VerifyResponse>) => {
        if (response.data.statusCode !== 200) {
          throw new Error(response.data.message);
        }
      })
      .catch(() => {
        setUser(null);
        navigate('/login');
      });
  };

  const handleLogin = async (request: LoginRequest): Promise<void> => {
    login(request)
      .then((response: AxiosResponse<LoginResponse>) => {
        setUser(response.data.data);
        navigate('/');
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setUser(null);
        throw error;
      });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    verify: handleVerify,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
