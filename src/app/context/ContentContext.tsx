import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { defaultContent, type ContentData } from '../content/defaultContent';
import { contentRepository } from '../../services/contentService';

export type { ContentData, Destination, Package, Testimonial } from '../content/defaultContent';

interface ContentContextType {
  content: ContentData;
  /** Guarda y devuelve el contenido tal como quedó (con imágenes ya subidas, si aplica). */
  saveContent: (content: ContentData) => Promise<ContentData>;
  /** true si lo guardado lo ven todos los visitantes (hay backend). */
  sharedContent: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    let cancelled = false;
    contentRepository
      .load()
      .then(loaded => {
        if (!cancelled) setContent(loaded);
      })
      .catch(error => console.error('No se pudo cargar el contenido:', error));
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
    <ContentContext.Provider value={{ content, saveContent, sharedContent: contentRepository.shared }}>
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
