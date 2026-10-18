import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsEnabled, getConsent, setConsent } from '../../services/AnalyticsService';

export const OPEN_COOKIE_SETTINGS = 'travelfans:cookie-settings';

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => analyticsEnabled && getConsent() === 'unset');

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  if (!analyticsEnabled || !visible) return null;

  const choose = (state: 'granted' | 'denied') => {
    setConsent(state);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={t('footer.cookies')}
      className="fixed bottom-4 left-4 right-24 md:right-auto md:max-w-md z-50 bg-white rounded-2xl shadow-2xl border border-purple-100 p-5"
    >
      <p className="text-sm text-gray-700 mb-4">{t('cookies.text')}</p>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 text-sm hover:border-gray-400"
        >
          {t('cookies.decline')}
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white text-sm hover:shadow-lg"
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
}
