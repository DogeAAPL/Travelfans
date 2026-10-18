import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { analyticsEnabled, resetConsent } from '../../services/AnalyticsService';
import { LanguageSelector } from './LanguageSelector';
import { OPEN_COOKIE_SETTINGS } from './CookieBanner';
import logo from '../../imports/Travelfans_logo.png';

const linkClass = 'text-gray-300 hover:text-[#d8b4fe] transition-colors';
const socialClass =
  'w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#9333ea] rounded-full flex items-center justify-center transition-all';

export function Footer() {
  const { t } = useTranslation();
  const { content } = useContent();
  const wa = (message: string | undefined, source: string) => whatsappLinkProps(content.whatsappNumber, message, source);

  const openCookieSettings = () => {
    resetConsent();
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
  };

  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b3d] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img src={logo} alt="TravelFans" loading="lazy" width={160} height={64} className="h-16 w-auto brightness-0 invert" />
            </div>

            <p className="text-gray-300 mb-6">{t('footer.description')}</p>

            <div className="flex gap-4 mb-6">
              <a
                href="https://www.facebook.com/travelfansagencia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social', { network: 'Facebook' })}
                className={socialClass}
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/travelfansagencia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social', { network: 'Instagram' })}
                className={socialClass}
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href="https://www.tiktok.com/@travelfansagencia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social', { network: 'TikTok' })}
                className={socialClass}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.12v13.17a2.73 2.73 0 1 1-2.73-2.73c.27 0 .53.04.78.11V9.39a5.86 5.86 0 1 0 5.08 5.78V8.48a7.9 7.9 0 0 0 4.76 1.6V6.99c-.34 0-.67-.1-1-.3Z" />
                </svg>
              </a>
            </div>

            <LanguageSelector />
          </div>

          <nav aria-labelledby="footer-destinations">
            <h2 id="footer-destinations" className="text-lg mb-6">{t('footer.destinations')}</h2>
            <ul className="space-y-3">
              {content.destinations.slice(0, 5).map(dest => (
                <li key={dest.id}>
                  <a href="#destinos" className={linkClass}>{dest.name}</a>
                </li>
              ))}
              <li>
                <a {...wa(t('footer.otherDestinationsMessage'), 'footer_other_destinations')} className={linkClass}>
                  {t('footer.otherDestinations')}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="text-lg mb-6">{t('footer.services')}</h2>
            <ul className="space-y-3">
              <li><a href="#paquetes" className={linkClass}>{t('footer.packages')}</a></li>
              <li><a {...wa(t('footer.flightsMessage'), 'footer_flights')} className={linkClass}>{t('footer.flights')}</a></li>
              <li><a {...wa(t('footer.hotelsMessage'), 'footer_hotels')} className={linkClass}>{t('footer.hotels')}</a></li>
              <li><a {...wa(t('footer.toursMessage'), 'footer_tours')} className={linkClass}>{t('footer.tours')}</a></li>
              <li><a {...wa(t('footer.adviceMessage'), 'footer_advice')} className={linkClass}>{t('footer.advice')}</a></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="text-lg mb-6">{t('footer.contact')}</h2>
            <ul className="space-y-3">
              <li>
                <a {...wa(undefined, 'footer_contact')} className={`${linkClass} flex items-center gap-2`}>
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('footer.whatsapp')}
                </a>
              </li>
              <li><a href="mailto:info@travelfans.com" className={linkClass}>{t('footer.email')}</a></li>
              <li><a href="#inicio" className={linkClass}>{t('footer.about')}</a></li>
              <li><a href="#testimonios" className={linkClass}>{t('footer.opinions')}</a></li>
              <li><a {...wa(t('footer.termsMessage'), 'footer_terms')} className={linkClass}>{t('footer.terms')}</a></li>
              {analyticsEnabled && (
                <li>
                  <button type="button" onClick={openCookieSettings} className={linkClass}>
                    {t('footer.cookies')}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-300">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
