import type { inflate } from 'zlib';

export type UserRole = 'Admin' | 'Developer' | 'Viewer';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string,password: string)=> Promise<void>;
  logout:()=> void,
}
