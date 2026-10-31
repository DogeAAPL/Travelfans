import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { defaultContent, type ContentData } from '../content/defaultContent';
import { contentRepository } from '../../services/contentService';

export type { ContentData, Destination, Experience, Package, Testimonial } from '../content/defaultContent';

interface ContentContextType {
  content: ContentData;
  /** 'error': no se pudo cargar y `content` es el de respaldo (no se debe guardar encima). */
  loadStatus: 'loading' | 'ready' | 'error';
  /** Guarda y devuelve el contenido tal como quedó (con imágenes ya subidas, si aplica). */
  saveContent: (content: ContentData) => Promise<ContentData>;
  /** true si lo guardado lo ven todos los visitantes (hay backend). */
  sharedContent: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [loadStatus, setLoadStatus] = useState<ContentContextType['loadStatus']>('loading');

  useEffect(() => {
    let cancelled = false;
    contentRepository
      .load()
      .then(loaded => {
        if (cancelled) return;
        setContent(loaded);
        setLoadStatus('ready');
      })
      .catch(error => {
        // Sin conexión o Supabase pausado: los visitantes ven el contenido por defecto.
        console.error('No se pudo cargar el contenido:', error);
        if (!cancelled) setLoadStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const saveContent = useCallback(async (next: ContentData) => {
    const saved = await contentRepository.save(next);
    setContent(saved);
    return saved;
  }, []);

  return (
    <ContentContext.Provider value={{ content, loadStatus, saveContent, sharedContent: contentRepository.shared }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
