import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../../services/authService';
import type { LoginResult, Session } from '../../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  /** true mientras se recupera la sesión guardada al abrir la página. */
  loading: boolean;
  session: Session | null;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    authService.restoreSession().then(restored => {
      if (cancelled) return;
      setSession(restored);
      setLoading(false);
    });
    const unsubscribe = authService.onSignedOut(() => setSession(null));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Sesiones con vencimiento fijo (modo local): cerrar automáticamente al expirar.
  useEffect(() => {
    if (!session?.expiresAt) return;
    const timeout = window.setTimeout(() => setSession(null), session.expiresAt - Date.now());
    return () => window.clearTimeout(timeout);
  }, [session]);

  const login = async (username: string, password: string) => {
    const result = await authService.login(username, password);
    if (result.ok) setSession(result.session);
    return result;
  };

  const logout = async () => {
    setSession(null);
    await authService.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: session !== null, loading, session, login, logout }}>
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
