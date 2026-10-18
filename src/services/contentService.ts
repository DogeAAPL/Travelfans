import { defaultContent, type ContentData } from '../app/content/defaultContent';
import { sanitizeContent } from '../app/content/validation';
import { supabase, SITE_IMAGES_BUCKET } from './supabaseClient';

/**
 * Punto único de lectura/escritura del contenido del sitio.
 *
 * Con Supabase configurado (VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY)
 * el contenido vive en la tabla `site_content` y lo ven todos los visitantes.
 * Sin esas variables se usa localStorage (solo este navegador).
 */
export interface ContentRepository {
  /** true si los cambios guardados se publican para todos los visitantes. */
  readonly shared: boolean;
  load(): Promise<ContentData>;
  /** Guarda y devuelve el contenido tal como quedó guardado (p. ej. con las imágenes ya subidas). */
  save(content: ContentData): Promise<ContentData>;
}

export class StorageFullError extends Error {
  constructor() {
    super('No hay espacio suficiente para guardar. Usa imágenes más livianas o URLs en lugar de archivos.');
  }
}

export class NotAuthorizedError extends Error {
  constructor() {
    super('Tu sesión no tiene permisos de administrador o expiró. Vuelve a iniciar sesión.');
  }
}

const STORAGE_KEY = 'travelfans_content';

const localRepository: ContentRepository = {
  shared: false,
  async load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? sanitizeContent(JSON.parse(saved)) : defaultContent;
    } catch {
      // JSON corrupto o storage bloqueado: mostrar el contenido por defecto en vez de romper la página.
      return defaultContent;
    }
  },
  async save(content) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.code === 22)) {
        throw new StorageFullError();
      }
      throw error;
    }
    return content;
  },
};

const isPermissionError = (code: string | undefined) => code === '42501' || code === 'PGRST301';

/** Sube a Storage una imagen embebida (data:image/...) y devuelve su URL pública. */
async function uploadDataUrl(dataUrl: string): Promise<string> {
  const client = supabase!;
  const blob = await (await fetch(dataUrl)).blob();
  const extension = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from(SITE_IMAGES_BUCKET).upload(path, blob, {
    contentType: blob.type,
    cacheControl: '31536000',
  });
  if (error) {
    if ('statusCode' in error && (error.statusCode === '403' || error.statusCode === '401')) throw new NotAuthorizedError();
    throw new Error(`No se pudo subir una imagen: ${error.message}`);
  }
  return client.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Reemplaza las imágenes embebidas del contenido por URLs de Storage. */
async function uploadEmbeddedImages(content: ContentData): Promise<ContentData> {
  const upload = (image: string) => (image.startsWith('data:image/') ? uploadDataUrl(image) : Promise.resolve(image));
  const [destinations, testimonials] = await Promise.all([
    Promise.all(content.destinations.map(async dest => ({ ...dest, image: await upload(dest.image) }))),
    Promise.all(content.testimonials.map(async test => ({ ...test, image: await upload(test.image) }))),
  ]);
  return { ...content, destinations, testimonials };
}

const supabaseRepository: ContentRepository = {
  shared: true,
  async load() {
    const { data, error } = await supabase!.from('site_content').select('data').eq('id', 1).maybeSingle();
    if (error) {
      // Sin conexión o Supabase pausado: el sitio sigue mostrándose con el contenido por defecto.
      console.error('No se pudo cargar el contenido desde Supabase:', error.message);
      return defaultContent;
    }
    return data ? sanitizeContent(data.data) : defaultContent;
  },
  async save(content) {
    const withUrls = await uploadEmbeddedImages(content);
    const { error } = await supabase!.from('site_content').upsert({ id: 1, data: withUrls });
    if (error) {
      if (isPermissionError(error.code)) throw new NotAuthorizedError();
      throw new Error(`No se pudieron guardar los cambios: ${error.message}`);
    }
    return withUrls;
  },
};

export const contentRepository: ContentRepository = supabase ? supabaseRepository : localRepository;
