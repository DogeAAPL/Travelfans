import { defaultContent, type ContentData } from '../app/content/defaultContent';
import { sanitizeContent } from '../app/content/validation';

/**
 * Punto único de lectura/escritura del contenido del sitio.
 *
 * Hoy guarda en localStorage del navegador (los cambios del admin solo los ve
 * ese navegador). Para publicar cambios a todos los visitantes basta con
 * reemplazar `localRepository` por uno que llame a un backend (Supabase,
 * Spring Boot, etc.) con la misma interfaz.
 */
export interface ContentRepository {
  load(): Promise<ContentData>;
  save(content: ContentData): Promise<void>;
}

const STORAGE_KEY = 'travelfans_content';

export class StorageFullError extends Error {
  constructor() {
    super('No hay espacio suficiente para guardar. Usa imágenes más livianas o URLs en lugar de archivos.');
  }
}

const localRepository: ContentRepository = {
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
  },
};

export const contentRepository: ContentRepository = localRepository;
