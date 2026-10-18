import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';

export function WhatsAppFloat() {
  const { t } = useTranslation();
  const { content } = useContent();

  return (
    <a
      {...whatsappLinkProps(content.whatsappNumber, t('whatsappFloat.message'), 'floating_button')}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      aria-label={t('whatsappFloat.label')}
    >
      <MessageCircle className="w-8 h-8" aria-hidden="true" />
    </a>
  );
}
