import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import logo from '../../imports/Travelfans_logo.png';

export function Navbar() {
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="TravelFans"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-[#c026d3] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('destinos')}
              className="text-gray-700 hover:text-[#c026d3] transition-colors"
            >
              Destinos
            </button>
            <button
              onClick={() => scrollToSection('paquetes')}
              className="text-gray-700 hover:text-[#c026d3] transition-colors"
            >
              Paquetes
            </button>
            <button
              onClick={() => scrollToSection('testimonios')}
              className="text-gray-700 hover:text-[#c026d3] transition-colors"
            >
              Opiniones
            </button>
            <a
              href={`https://wa.me/${content.whatsappNumber}?text=Hola!%20Quiero%20cotizar%20un%20viaje`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar
            </a>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left text-gray-700 hover:text-[#c026d3] py-2"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('destinos')}
              className="block w-full text-left text-gray-700 hover:text-[#c026d3] py-2"
            >
              Destinos
            </button>
            <button
              onClick={() => scrollToSection('paquetes')}
              className="block w-full text-left text-gray-700 hover:text-[#c026d3] py-2"
            >
              Paquetes
            </button>
            <button
              onClick={() => scrollToSection('testimonios')}
              className="block w-full text-left text-gray-700 hover:text-[#c026d3] py-2"
            >
              Opiniones
            </button>
            <a
              href={`https://wa.me/${content.whatsappNumber}?text=Hola!%20Quiero%20cotizar%20un%20viaje`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white px-6 py-2 rounded-full text-center"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
