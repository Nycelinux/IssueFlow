import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextValue, User } from './types';
import { loginUser } from '../api/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('authUser');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser) as User;
    } catch {
      localStorage.removeItem('authUser');
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });
  async function login(username: string, password: string) {
    const response = await loginUser(username, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('authUser', JSON.stringify(response.user));
    localStorage.setItem('authToken', response.token);
  }
  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  }
  const contextValue: AuthContextValue = {
    user,
    token,
    isAuthenticated: user !== null && token !== null,
    login,
    logout,
  };
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
