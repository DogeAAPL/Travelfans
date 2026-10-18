import { trackWhatsAppClick } from '../../services/AnalyticsService';

export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${encodeURIComponent(number)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Props comunes para enlaces de WhatsApp: abren en pestaña nueva y registran el clic (si hay consentimiento). */
export function whatsappLinkProps(number: string, message: string | undefined, source: string) {
  return {
    href: whatsappUrl(number, message),
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => trackWhatsAppClick(source),
  };
}
