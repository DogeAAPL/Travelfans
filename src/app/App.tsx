import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

// El login y el panel solo los usa el administrador: se descargan aparte para que la portada cargue más rápido.
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
