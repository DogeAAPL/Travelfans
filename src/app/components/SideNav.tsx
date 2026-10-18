import { Home, Flag, Briefcase, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SECTIONS, scrollToSection } from './scrollToSection';

export function SideNav() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('inicio');
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('inicio');
    if (!heroSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', icon: Home, label: t('nav.home') },
    { id: 'destinos', icon: Flag, label: t('nav.destinations') },
    { id: 'paquetes', icon: Briefcase, label: t('nav.packages') },
    { id: 'testimonios', icon: Quote, label: t('nav.opinions') }
  ];

  if (headerVisible) return null;

  return (
    <nav aria-label={t('nav.sections')} className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block group/nav">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100 transition-all duration-300">
        <div className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-2 transition-all ${
                  isActive ? 'scale-105' : 'hover:scale-105'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#c026d3] to-[#9333ea] text-white shadow-md'
                      : 'bg-purple-50 text-[#9333ea] hover:bg-gradient-to-br hover:from-[#c026d3] hover:to-[#9333ea] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>

                <span
                  aria-hidden="true"
                  className={`text-xs font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent'
                      : 'text-gray-600'
                  } max-w-0 opacity-0 group-hover/nav:max-w-[80px] group-hover/nav:opacity-100`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-[#c026d3] to-[#9333ea] rounded-full transition-all duration-300 group-hover/nav:-right-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
