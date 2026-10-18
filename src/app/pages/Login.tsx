import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { authMode } from '../../services/authService';
import { Lock, User, AlertCircle } from 'lucide-react';
import logo from '../../imports/Travelfans_logo.png';

export function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const useEmail = authMode === 'supabase';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await login(username, password);
      if (result.ok) {
        navigate('/admin');
        return;
      }
      setPassword('');
      if (result.reason === 'locked') setError(t('login.locked', { seconds: result.retryInSeconds }));
      else if (result.reason === 'invalid') setError(t('login.error'));
      else setError(t(`login.${result.reason}`));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#c026d3] to-[#9333ea] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src={logo} alt="TravelFans" width={160} height={64} className="h-16 w-auto mx-auto mb-6" />
            <h1 className="text-3xl mb-2">{t('login.title')}</h1>
            <p className="text-gray-600">{t('login.subtitle')}</p>
          </div>

          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-username" className="block text-gray-700 mb-2">
                {useEmail ? t('login.email') : t('login.username')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9333ea]" aria-hidden="true" />
                <input
                  id="login-username"
                  type={useEmail ? 'email' : 'text'}
                  autoComplete={useEmail ? 'email' : 'username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-gray-700 mb-2">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9333ea]" aria-hidden="true" />
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-60"
            >
              {submitting ? t('login.signingIn') : t('login.signIn')}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:text-purple-100 transition-colors">
            {t('login.back')}
          </Link>
        </div>
      </div>
    </main>
  );
}
