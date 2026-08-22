import { useAuth } from './AuthContext';
import type { UserRole } from './types';

export function useRole() {
  const { user } = useAuth();
  function hasRole(...allowedRoles: UserRole[]) {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
  return {
    role: user?.role ?? null,
    hasRole,
    isAdmin: user?.role === 'Admin',
    isDeveloper: user?.role === 'Developer',
    isViewer: user?.role === 'Viewer',
  };
}
