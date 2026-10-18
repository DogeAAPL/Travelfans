import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../services/i18nConfig';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div role="group" aria-label={t('footer.language')} className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-gray-300" aria-hidden="true" />
      <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const active = current === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              lang={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              aria-pressed={active}
              title={lang.name}
              className={`px-3 py-1 rounded text-sm transition-all ${
                active ? 'bg-[#9333ea] text-white' : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              <span aria-hidden="true">{lang.short}</span>
              <span className="sr-only">{lang.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
