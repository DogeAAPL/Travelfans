import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se recupera la sesión no redirigir, para no expulsar a un admin que ya inició sesión.
  if (loading) return <div className="min-h-screen" aria-busy="true" />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
