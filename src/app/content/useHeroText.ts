import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { defaultContent } from './defaultContent';

const STAT_KEYS = ['countries', 'travelers', 'personalized', 'whatsapp'] as const;

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
    stats: content.heroStats.map((stat, index) => {
      const defaultStat = defaultContent.heroStats[index];
      const key = STAT_KEYS[index];
      return {
        value: stat.value,
        label: defaultStat && key ? pick(stat.label, defaultStat.label, `hero.stats.${key}`) : stat.label,
      };
    }),
  };
}
