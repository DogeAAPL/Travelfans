export const SECTIONS = ['inicio', 'destinos', 'paquetes', 'testimonios'] as const;

const NAVBAR_OFFSET = 80;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}
