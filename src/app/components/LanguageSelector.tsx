import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
}

/**
 * Language Selector Component
 * Allows users to switch between supported languages
 */
export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('travelfans_lang', langCode);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1 text-sm ${
              i18n.language === lang.code
                ? 'bg-[#a855f7] text-white'
                : 'text-gray-600 hover:text-[#a855f7]'
            }`}
            title={lang.name}
          >
            <span>{lang.flag}</span>
            <span className="hidden lg:inline">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Mobile selector */}
      <div className="md:hidden">
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg backdrop-blur-sm border border-white/20 hover:border-[#a855f7] transition-colors text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
