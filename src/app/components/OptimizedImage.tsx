import { useState, useEffect } from 'react';
import { ImageCacheService } from '../../services/ImageCacheService';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized Image Component with Lazy Loading and Caching
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        const cachedUrl = await ImageCacheService.getImage(src);
        if (isMounted) {
          setImageSrc(cachedUrl);
          setIsLoading(false);
          onLoad?.();
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true);
          setImageSrc(fallback);
          setIsLoading(false);
          onError?.();
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, fallback, onLoad, onError]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoading ? 'animate-pulse' : ''} ${hasError ? 'opacity-50' : ''}`}
      loading="lazy"
      decoding="async"
    />
  );
}
