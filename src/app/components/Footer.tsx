import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import logo from '../../imports/Travelfans_logo.png';

export function Footer() {
  const { content } = useContent();
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b3d] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img
                src={logo}
                alt="TravelFans"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Especialistas en destinos de Latinoamérica. Cotiza tu viaje soñado por WhatsApp de forma rápida y personalizada.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] rounded-full flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] rounded-full flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] rounded-full flex items-center justify-center transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-6">Destinos</h4>
            <ul className="space-y-3">
              <li><a href="#destinos" className="text-gray-300 hover:text-[#a855f7] transition-colors">Perú</a></li>
              <li><a href="#destinos" className="text-gray-300 hover:text-[#a855f7] transition-colors">Colombia</a></li>
              <li><a href="#destinos" className="text-gray-300 hover:text-[#a855f7] transition-colors">Panamá</a></li>
              <li><a href="#destinos" className="text-gray-300 hover:text-[#a855f7] transition-colors">Brasil</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Quiero%20info%20de%20otros%20destinos`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Otros Destinos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="#paquetes" className="text-gray-300 hover:text-[#a855f7] transition-colors">Paquetes Turísticos</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Quiero%20cotizar%20vuelos`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Vuelos</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Quiero%20cotizar%20hoteles`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Hoteles</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Quiero%20info%20de%20tours`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Tours</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Necesito%20asesoría%20de%20viaje`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Asesoría Personalizada</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href={`https://wa.me/${content.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li><a href="mailto:info@travelfans.com" className="text-gray-300 hover:text-[#a855f7] transition-colors">Email</a></li>
              <li><a href="#inicio" className="text-gray-300 hover:text-[#a855f7] transition-colors">Sobre Nosotros</a></li>
              <li><a href="#testimonios" className="text-gray-300 hover:text-[#a855f7] transition-colors">Opiniones</a></li>
              <li><a href={`https://wa.me/${content.whatsappNumber}?text=Quiero%20info%20sobre%20términos`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a855f7] transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2026 TravelFans. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
