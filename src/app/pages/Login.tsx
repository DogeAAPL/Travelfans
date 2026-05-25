import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle } from 'lucide-react';
import logo from '../../imports/Travelfans_logo.png';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c026d3] to-[#a855f7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="TravelFans"
              className="h-16 w-auto mx-auto mb-6"
            />
            <h1 className="text-3xl mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Credenciales por defecto:</p>
            <p className="mt-1">Usuario: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin</span></p>
            <p>Contraseña: <span className="font-mono bg-gray-100 px-2 py-1 rounded">travelfans2024</span></p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white hover:text-purple-100 transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
