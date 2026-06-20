import jwtDecode from 'jwt-decode';

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'travelfans-secret-key-2024';

export class JwtService {
  /**
   * Generate a JWT token (simulated - in production use backend)
   */
  static generateToken(user: { id: string; email: string; name: string }): string {
    const now = Math.floor(Date.now() / 1000);
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: now,
      exp: now + 24 * 60 * 60 // 24 hours
    };

    // Simple token generation (in production, this comes from backend)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa(JWT_SECRET);
    
    return `${header}.${body}.${signature}`;
  }

  /**
   * Decode and verify JWT token
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      
      if (decoded.exp < now) {
        return null; // Token expired
      }
      
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    return !decoded;
  }

  /**
   * Get token from localStorage
   */
  static getToken(): string | null {
    return localStorage.getItem('travelfans_token');
  }

  /**
   * Save token to localStorage
   */
  static setToken(token: string): void {
    localStorage.setItem('travelfans_token', token);
  }

  /**
   * Remove token from localStorage
   */
  static removeToken(): void {
    localStorage.removeItem('travelfans_token');
  }

  /**
   * Refresh token (simulated)
   */
  static refreshToken(user: { id: string; email: string; name: string }): string {
    const newToken = this.generateToken(user);
    this.setToken(newToken);
    return newToken;
  }
}
