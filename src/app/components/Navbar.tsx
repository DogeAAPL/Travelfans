import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { scrollToSection } from './scrollToSection';
import logo from '../../imports/Travelfans_logo.png';

export function Navbar() {
  const { t } = useTranslation();
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { id: 'inicio', label: t('nav.home') },
    { id: 'destinos', label: t('nav.destinations') },
    { id: 'paquetes', label: t('nav.packages') },
    { id: 'testimonios', label: t('nav.opinions') },
  ];

  const goTo = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const quoteLink = whatsappLinkProps(content.whatsappNumber, t('nav.quoteMessage'), 'navbar');

  return (
    <nav aria-label={t('nav.main')} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button type="button" onClick={() => goTo('inicio')} className="flex items-center" aria-label={t('nav.home')}>
            <img src={logo} alt="TravelFans" width={140} height={56} className="h-12 md:h-14 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className="text-gray-700 hover:text-[#c026d3] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              {...quoteLink}
              className="bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('nav.quote')}
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-gray-700 p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {links.map(link => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className="block w-full text-left text-gray-700 hover:text-[#c026d3] py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              {...quoteLink}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white px-6 py-2 rounded-full text-center"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('nav.quote')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
