import { defaultContent, type ContentData, type Destination, type Package, type Testimonial } from './defaultContent';

export const MAX_ITEMS = 10;

const WHATSAPP_RE = /^\d{8,15}$/;

/** Número internacional sin "+" ni espacios: código de país + número (8 a 15 dígitos). */
export function isValidWhatsapp(value: string): boolean {
  return WHATSAPP_RE.test(value);
}

/** Solo se aceptan imágenes https o imágenes embebidas (data:image/...). */
export function isSafeImageUrl(value: string): boolean {
  if (value.startsWith('data:image/')) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Convierte "a, b ,c," en ["a", "b", "c"]. */
export function splitList(value: string): string[] {
  return value.split(',').map(item => item.trim()).filter(Boolean);
}

export function nextId(items: Array<{ id: number }>): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

const str = (value: unknown, fallback: string) => (typeof value === 'string' ? value : fallback);
const num = (value: unknown, fallback: number, min: number, max: number) =>
  typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
const strList = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []);
const list = <T,>(value: unknown, fallback: T[], map: (raw: Record<string, unknown>, index: number) => T): T[] =>
  Array.isArray(value)
    ? value.filter(v => v && typeof v === 'object').slice(0, MAX_ITEMS).map((v, i) => map(v as Record<string, unknown>, i))
    : fallback;
const image = (value: unknown, fallback: string) => {
  const url = str(value, fallback);
  return isSafeImageUrl(url) ? url : fallback;
};

/**
 * Normaliza contenido de origen no confiable (localStorage, futuro backend):
 * completa campos faltantes con los valores por defecto y descarta lo inválido,
 * para que la página nunca se rompa por datos corruptos.
 */
export function sanitizeContent(raw: unknown): ContentData {
  if (!raw || typeof raw !== 'object') return defaultContent;
  const data = raw as Record<string, unknown>;
  const d = defaultContent;

  // Contenido guardado antes de existir heroHighlight: separar el título como hacía la versión anterior.
  let heroTitle = str(data.heroTitle, d.heroTitle);
  let heroHighlight = typeof data.heroHighlight === 'string' ? data.heroHighlight : undefined;
  if (heroHighlight === undefined) {
    const words = heroTitle.split(' ');
    heroHighlight = words.slice(3).join(' ');
    heroTitle = words.slice(0, 3).join(' ');
  }

  const whatsapp = str(data.whatsappNumber, d.whatsappNumber);

  return {
    heroTitle,
    heroHighlight,
    heroSubtitle: str(data.heroSubtitle, d.heroSubtitle),
    heroStats: list(data.heroStats, d.heroStats, s => ({ label: str(s.label, ''), value: str(s.value, '') })).slice(0, 4),
    destinations: list<Destination>(data.destinations, d.destinations, (x, i) => ({
      id: num(x.id, i + 1, 1, Number.MAX_SAFE_INTEGER),
      name: str(x.name, ''),
      location: str(x.location, ''),
      image: image(x.image, ''),
      rating: num(x.rating, 5, 0, 5),
      reviews: Math.round(num(x.reviews, 0, 0, 1_000_000)),
      highlights: strList(x.highlights),
      description: str(x.description, ''),
    })),
    packages: list<Package>(data.packages, d.packages, (x, i) => ({
      id: num(x.id, i + 1, 1, Number.MAX_SAFE_INTEGER),
      name: str(x.name, ''),
      duration: str(x.duration, ''),
      destinations: str(x.destinations, ''),
      popular: x.popular === true,
      features: strList(x.features),
    })),
    testimonials: list<Testimonial>(data.testimonials, d.testimonials, (x, i) => ({
      id: num(x.id, i + 1, 1, Number.MAX_SAFE_INTEGER),
      name: str(x.name, ''),
      location: str(x.location, ''),
      rating: Math.round(num(x.rating, 5, 1, 5)),
      text: str(x.text, ''),
      image: image(x.image, ''),
    })),
    whatsappNumber: isValidWhatsapp(whatsapp) ? whatsapp : d.whatsappNumber,
  };
}

/** Errores legibles para mostrar en el panel antes de guardar. Lista vacía = válido. */
export function validateContent(content: ContentData): string[] {
  const errors: string[] = [];
  if (!content.heroTitle.trim()) errors.push('El título principal no puede estar vacío.');
  if (!isValidWhatsapp(content.whatsappNumber)) {
    errors.push('El número de WhatsApp debe tener solo dígitos (8 a 15), con código de país y sin "+".');
  }
  content.destinations.forEach(dest => {
    if (!dest.name.trim()) errors.push(`Destino #${dest.id}: falta el nombre.`);
    if (dest.image && !isSafeImageUrl(dest.image)) errors.push(`Destino #${dest.id}: la imagen debe ser una URL https.`);
    if (dest.rating < 0 || dest.rating > 5) errors.push(`Destino #${dest.id}: el rating debe estar entre 0 y 5.`);
  });
  content.packages.forEach(pkg => {
    if (!pkg.name.trim()) errors.push(`Paquete #${pkg.id}: falta el nombre.`);
  });
  content.testimonials.forEach(test => {
    if (!test.name.trim()) errors.push(`Testimonio #${test.id}: falta el nombre.`);
    if (test.image && !isSafeImageUrl(test.image)) errors.push(`Testimonio #${test.id}: la imagen debe ser una URL https.`);
  });
  return errors;
}
