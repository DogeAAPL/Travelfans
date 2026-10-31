import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { defaultContent } from './defaultContent';

// Etiquetas originales (en español) que se traducen mientras el administrador no las cambie.
const STAT_KEYS: Record<string, string> = {
  'Países Destacados': 'countries',
  'Viajeros Felices': 'travelers',
  Personalizado: 'personalized',
  WhatsApp: 'whatsapp',
};

/**
 * Textos del hero. Si el administrador no los cambió, se muestran traducidos;
 * si los personalizó, se respeta lo que escribió (en el idioma en que lo escribió).
 */
export function useHeroText() {
  const { t } = useTranslation();
  const { content } = useContent();
  const pick = (value: string, defaultValue: string, key: string) => (value === defaultValue ? t(key) : value);

  return {
    title: pick(content.heroTitle, defaultContent.heroTitle, 'hero.title'),
    highlight: pick(content.heroHighlight, defaultContent.heroHighlight, 'hero.highlight'),
    subtitle: pick(content.heroSubtitle, defaultContent.heroSubtitle, 'hero.subtitle'),
    stats: content.heroStats.map(stat => {
      const key = STAT_KEYS[stat.label];
      return { value: stat.value, label: key ? t(`hero.stats.${key}`) : stat.label };
    }),
  };
}
