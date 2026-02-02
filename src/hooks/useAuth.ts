import { useAtom, useSetAtom } from 'jotai';
import { authAtom, setAuthAtom, clearAuthAtom } from '../atom/auth';
import { logout as logoutService } from '../lib/axios';

export const useAuth = () => {
  const [auth] = useAtom(authAtom);
  const setAuth = useSetAtom(setAuthAtom);
  const clearAuth = useSetAtom(clearAuthAtom);

  const login = (accessToken: string, role: string) => {
    setAuth({
      isAuthenticated: true,
      isLoading: false,
      accessToken,
      role,
    });
  };

  const logout = () => {
    clearAuth();
    logoutService();
  };

  const setLoading = (isLoading: boolean) => {
    setAuth({ isLoading });
  };

  return {
    auth,
    login,
    logout,
    setLoading,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    accessToken: auth.accessToken,
    role: auth.role,
  };
};
