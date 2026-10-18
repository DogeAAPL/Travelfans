import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../../services/authService';
import type { LoginResult, Session } from '../../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  session: Session | null;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => authService.getSession());

  // Cierra la sesión automáticamente cuando expira.
  useEffect(() => {
    if (!session) return;
    const timeout = window.setTimeout(() => setSession(authService.getSession()), session.expiresAt - Date.now());
    return () => window.clearTimeout(timeout);
  }, [session]);

  const login = async (username: string, password: string) => {
    const result = await authService.login(username, password);
    if (result.ok) setSession(result.session);
    return result;
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: session !== null, session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
