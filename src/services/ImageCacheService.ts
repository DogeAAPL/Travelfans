/**
 * Image Cache Service
 * Handles image caching, lazy loading, and optimization
 */

interface CachedImage {
  url: string;
  blob: Blob;
  timestamp: number;
  size: number;
}

const CACHE_NAME = 'travelfans-images-v1';
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export class ImageCacheService {
  private static cache: Map<string, CachedImage> = new Map();
  private static totalSize = 0;

  /**
   * Initialize cache from localStorage
   */
  static async init(): Promise<void> {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        if (keys.includes(CACHE_NAME)) {
          const cache = await caches.open(CACHE_NAME);
          const requests = await cache.keys();
          
          for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
              const blob = await response.blob();
              this.cache.set(request.url, {
                url: request.url,
                blob,
                timestamp: Date.now(),
                size: blob.size
              });
            }
          }
        }
      }
    } catch (error) {
      console.warn('Cache initialization failed:', error);
    }
  }

  /**
   * Get cached image or fetch from URL
   */
  static async getImage(url: string): Promise<string> {
    // Check memory cache
    if (this.cache.has(url)) {
      const cached = this.cache.get(url)!;
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return URL.createObjectURL(cached.blob);
      } else {
        // Remove expired cache
        this.cache.delete(url);
      }
    }

    // Check IndexedDB/Service Worker cache
    try {
      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME);
        const response = await cache.match(url);
        if (response) {
          const blob = await response.blob();
          this.cache.set(url, {
            url,
            blob,
            timestamp: Date.now(),
            size: blob.size
          });
          return URL.createObjectURL(blob);
        }
      }
    } catch (error) {
      console.warn('Cache match failed:', error);
    }

    // Fetch from URL
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        
        // Store in cache
        try {
          if ('caches' in window) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(url, new Response(blob, { status: 200 }));
          }
        } catch (error) {
          console.warn('Failed to cache image:', error);
        }

        // Store in memory
        if (this.totalSize + blob.size < MAX_CACHE_SIZE) {
          this.cache.set(url, {
            url,
            blob,
            timestamp: Date.now(),
            size: blob.size
          });
          this.totalSize += blob.size;
        } else {
          // Clear old items if cache is full
          this.clearOldCache();
          this.cache.set(url, {
            url,
            blob,
            timestamp: Date.now(),
            size: blob.size
          });
          this.totalSize += blob.size;
        }

        return URL.createObjectURL(blob);
      }
    } catch (error) {
      console.error('Failed to fetch image:', url, error);
      return url; // Return original URL as fallback
    }

    return url;
  }

  /**
   * Get optimized image with srcset for responsive images
   */
  static getResponsiveImageUrl(url: string): string {
    // This is a placeholder for image optimization service
    // In production, use cloudinary, imgix, or similar
    return url;
  }

  /**
   * Preload images
   */
  static async preloadImages(urls: string[]): Promise<void> {
    await Promise.all(urls.map(url => this.getImage(url)));
  }

  /**
   * Clear old cached images
   */
  static clearOldCache(): void {
    const now = Date.now();
    const sortedEntries = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    // Remove oldest 25% of cache
    const itemsToRemove = Math.ceil(sortedEntries.length * 0.25);
    for (let i = 0; i < itemsToRemove; i++) {
      const [url, item] = sortedEntries[i];
      this.cache.delete(url);
      this.totalSize -= item.size;
    }
  }

  /**
   * Clear all cache
   */
  static async clearAll(): Promise<void> {
    this.cache.clear();
    this.totalSize = 0;

    try {
      if ('caches' in window) {
        await caches.delete(CACHE_NAME);
      }
    } catch (error) {
      console.warn('Failed to clear browser cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  static getStats(): {
    size: number;
    itemCount: number;
    maxSize: number;
    usage: string;
  } {
    return {
      size: this.totalSize,
      itemCount: this.cache.size,
      maxSize: MAX_CACHE_SIZE,
      usage: `${((this.totalSize / MAX_CACHE_SIZE) * 100).toFixed(2)}%`
    };
  }
}

// Auto-initialize on import
ImageCacheService.init().catch(console.error);
