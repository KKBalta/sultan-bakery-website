// Image URL caching utility for Google Drive images
interface ImageCacheEntry {
  originalUrl: string;
  processedUrl: string;
  timestamp: number;
  success: boolean;
}

class ImageCache {
  private cache: Map<string, ImageCacheEntry> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_CACHE_SIZE = 100;

  /**
   * Get cached processed URL for an image
   */
  getProcessedUrl(originalUrl: string): string | null {
    const cached = this.cache.get(originalUrl);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(originalUrl);
      return null;
    }

    return cached.success ? cached.processedUrl : null;
  }

  /**
   * Cache a successful image URL processing
   */
  setProcessedUrl(originalUrl: string, processedUrl: string): void {
    // Manage cache size
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(originalUrl, {
      originalUrl,
      processedUrl,
      timestamp: Date.now(),
      success: true
    });
  }

  /**
   * Mark an image URL as failed
   */
  setFailed(originalUrl: string): void {
    this.cache.set(originalUrl, {
      originalUrl,
      processedUrl: '',
      timestamp: Date.now(),
      success: false
    });
  }

  /**
   * Clear all cached entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; successful: number; failed: number } {
    let successful = 0;
    let failed = 0;

    for (const entry of this.cache.values()) {
      if (entry.success) successful++;
      else failed++;
    }

    return {
      size: this.cache.size,
      successful,
      failed
    };
  }
}

// Singleton instance
export const imageCache = new ImageCache();
