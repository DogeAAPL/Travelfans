import { Home, Flag, Briefcase, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SideNav() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'destinos', 'paquetes', 'testimonios'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset para el navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'destinos', icon: Flag, label: 'Destinos' },
    { id: 'paquetes', icon: Briefcase, label: 'Paquetes' },
    { id: 'testimonios', icon: Quote, label: 'Opiniones' }
  ];

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block group/nav">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100 transition-all duration-300">
        <div className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-2 transition-all ${
                  isActive ? 'scale-105' : 'hover:scale-105'
                }`}
                aria-label={item.label}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#c026d3] to-[#a855f7] text-white shadow-md'
                      : 'bg-purple-50 text-[#a855f7] hover:bg-gradient-to-br hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-xs font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent'
                      : 'text-gray-600'
                  } max-w-0 opacity-0 group-hover/nav:max-w-[80px] group-hover/nav:opacity-100`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-[#c026d3] to-[#a855f7] rounded-full transition-all duration-300 group-hover/nav:-right-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
