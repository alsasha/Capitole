/**
 * LocalStorage utility with type safety and error handling
 */

export interface StorageConfig {
  prefix?: string;
  defaultExpiry?: number; // in milliseconds
}

export interface CachedItem<T> {
  data: T;
  timestamp: number;
  expiry?: number;
}

export class StorageManager {
  private prefix: string;
  private defaultExpiry: number;

  constructor(config: StorageConfig = {}) {
    this.prefix = config.prefix || 'app_';
    this.defaultExpiry = config.defaultExpiry || 60 * 60 * 1000; // 1 hour
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Get data from localStorage with type safety
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsed: CachedItem<T> = JSON.parse(item);
      
      // Check if item has expired
      if (parsed.expiry && Date.now() > parsed.timestamp + parsed.expiry) {
        this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  /**
   * Set data in localStorage with optional expiry
   */
  set<T>(key: string, data: T, expiry?: number): void {
    try {
      const item: CachedItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: expiry || this.defaultExpiry
      };
      
      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  }

  /**
   * Clear all items with this prefix
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if item exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Get all keys with this prefix
   */
  keys(): string[] {
    try {
      const keys = Object.keys(localStorage);
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }
}

// Default storage instance
export const storage = new StorageManager({ prefix: 'film_app_' });

// Specific storage instances for different features
export const filmStorage = new StorageManager({ 
  prefix: 'films_',
  defaultExpiry: 60 * 60 * 1000 // 1 hour
});

export const wishlistStorage = new StorageManager({ 
  prefix: 'wishlist_',
  defaultExpiry: 0 // No expiry for wishlist
});

// Utility functions for common operations
export const storageUtils = {
  /**
   * Get cached data with fallback
   */
  getCachedData: <T>(key: string, fallback: T): T => {
    return filmStorage.get<T>(key) ?? fallback;
  },

  /**
   * Set cached data with default expiry
   */
  setCachedData: <T>(key: string, data: T): void => {
    filmStorage.set(key, data);
  },

  /**
   * Clear all cached data
   */
  clearCache: (): void => {
    filmStorage.clear();
  },

  /**
   * Get cache statistics
   */
  getCacheStats: () => {
    const keys = filmStorage.keys();
    return {
      totalItems: keys.length,
      items: keys
    };
  }
}; 