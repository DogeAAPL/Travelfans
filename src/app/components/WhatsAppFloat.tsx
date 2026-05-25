import { MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function WhatsAppFloat() {
  const { content } = useContent();

  return (
    <a
      href={`https://wa.me/${content.whatsappNumber}?text=Hola!%20Quiero%20información%20sobre%20sus%20paquetes`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}
