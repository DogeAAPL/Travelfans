import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JwtService } from '../../services/JwtService';
import { AnalyticsService } from '../../services/AnalyticsService';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => boolean;
  loginWithGoogle: (googleToken: string) => boolean;
  logout: () => void;
  refreshToken: () => void;
  isTokenExpired: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth on mount
  useEffect(() => {
    const savedToken = JwtService.getToken();
    if (savedToken && !JwtService.isTokenExpired(savedToken)) {
      const decoded = JwtService.decodeToken(savedToken);
      if (decoded) {
        setIsAuthenticated(true);
        setToken(savedToken);
        setUser({
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name
        });
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    // Default credentials - in production, call backend API
    if (username === 'admin' && password === 'travelfans2024') {
      const newUser: User = {
        id: '1',
        email: 'admin@travelfans.com',
        name: 'Admin'
      };

      const newToken = JwtService.generateToken(newUser);
      JwtService.setToken(newToken);

      setIsAuthenticated(true);
      setUser(newUser);
      setToken(newToken);

      // Track login
      AnalyticsService.trackLogin('email');

      return true;
    }
    return false;
  };

  const loginWithGoogle = (googleToken: string) => {
    try {
      // In production, send googleToken to backend for verification
      const newUser: User = {
        id: googleToken.substring(0, 20),
        email: 'user@google.com',
        name: 'Google User'
      };

      const newToken = JwtService.generateToken(newUser);
      JwtService.setToken(newToken);

      setIsAuthenticated(true);
      setUser(newUser);
      setToken(newToken);

      AnalyticsService.trackLogin('google');

      return true;
    } catch (error) {
      console.error('Google login failed:', error);
      return false;
    }
  };

  const logout = () => {
    JwtService.removeToken();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    // Track logout
    AnalyticsService.trackLogout();
  };

  const refreshToken = () => {
    if (user) {
      const newToken = JwtService.refreshToken(user);
      setToken(newToken);
    }
  };

  const isTokenExpired = () => {
    if (!token) return true;
    return JwtService.isTokenExpired(token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        loginWithGoogle,
        logout,
        refreshToken,
        isTokenExpired
      }}
    >
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
