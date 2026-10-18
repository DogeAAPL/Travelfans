import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { defaultContent, type ContentData } from '../content/defaultContent';
import { contentRepository } from '../../services/contentService';

export type { ContentData, Destination, Package, Testimonial } from '../content/defaultContent';

interface ContentContextType {
  content: ContentData;
  saveContent: (content: ContentData) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    let cancelled = false;
    contentRepository.load().then(loaded => {
      if (!cancelled) setContent(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const saveContent = useCallback(async (next: ContentData) => {
    await contentRepository.save(next);
    setContent(next);
  }, []);

  return (
    <ContentContext.Provider value={{ content, saveContent }}>
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
