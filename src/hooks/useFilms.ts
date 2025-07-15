import { useState, useEffect, useCallback } from 'react';
import { fetchFilmsByCategory, type Film } from '../services/api';
import { filmStorage } from '../utils/storage';

export interface UseFilmsOptions {
  category: string;
  enableCache?: boolean;
  cacheExpiry?: number;
}

export interface UseFilmsReturn {
  films: Film[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
}

export const useFilms = ({ 
  category, 
  enableCache = true, 
  cacheExpiry 
}: UseFilmsOptions): UseFilmsReturn => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first if enabled
      if (enableCache) {
        const cached = filmStorage.get<Film[]>(category);
        if (cached) {
          setFilms(cached);
          setLoading(false);
          return;
        }
      }

      // Fetch from API
      const data = await fetchFilmsByCategory(category);
      setFilms(data);

      // Cache the data if enabled
      if (enableCache) {
        filmStorage.set(category, data, cacheExpiry);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch films';
      setError(errorMessage);
      console.error(`Error fetching ${category} films:`, err);
    } finally {
      setLoading(false);
    }
  }, [category, enableCache, cacheExpiry]);

  const refetch = useCallback(async () => {
    // Clear cache before refetching
    if (enableCache) {
      filmStorage.remove(category);
    }
    await fetchFilms();
  }, [category, enableCache, fetchFilms]);

  const clearCache = useCallback(() => {
    filmStorage.remove(category);
  }, [category]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return {
    films,
    loading,
    error,
    refetch,
    clearCache
  };
};

// Hook for multiple film categories
export interface UseMultipleFilmsOptions {
  categories: string[];
  enableCache?: boolean;
  cacheExpiry?: number;
  skip?: boolean;
}

export interface UseMultipleFilmsReturn {
  filmsByCategory: Record<string, Film[]>;
  loading: boolean;
  error: string | null;
  refetchAll: () => Promise<void>;
  clearAllCache: () => void;
}

export const useMultipleFilms = ({ 
  categories, 
  enableCache = true, 
  cacheExpiry,
  skip = false
}: UseMultipleFilmsOptions): UseMultipleFilmsReturn => {
  const [filmsByCategory, setFilmsByCategory] = useState<Record<string, Film[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllFilms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Use Promise.allSettled to handle partial failures
      const results = await Promise.allSettled(
        categories.map(async (category) => {
          try {
            // Check cache first if enabled
            if (enableCache) {
              const cached = filmStorage.get<Film[]>(category);
              if (cached) {
                return { category, films: cached };
              }
            }

            // Fetch from API with retry logic
            let films: Film[] = [];
            let lastError: Error | null = null;
            
            for (let attempt = 1; attempt <= 3; attempt++) {
              try {
                films = await fetchFilmsByCategory(category);
                break; // Success, exit retry loop
              } catch (err) {
                lastError = err instanceof Error ? err : new Error('Unknown error');
                console.warn(`Attempt ${attempt} failed for ${category}:`, lastError.message);
                
                if (attempt === 3) {
                  // Final attempt failed, throw the error
                  throw lastError;
                }
                
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, attempt * 1000));
              }
            }
            
            // Cache the data if enabled
            if (enableCache) {
              filmStorage.set(category, films, cacheExpiry);
            }

            return { category, films };
          } catch (err) {
            console.error(`Error fetching ${category} films after retries:`, err);
            // Return empty array for failed categories
            return { category, films: [] };
          }
        })
      );

      const newFilmsByCategory = results.reduce((acc, result) => {
        if (result.status === 'fulfilled') {
          acc[result.value.category] = result.value.films;
        } else {
          // Handle rejected promises by setting empty array
          const category = categories[results.indexOf(result)];
          acc[category] = [];
          console.error(`Failed to fetch ${category} films:`, result.reason);
        }
        return acc;
      }, {} as Record<string, Film[]>);

      setFilmsByCategory(newFilmsByCategory);
      
      // Check if any categories failed completely
      const failedCategories = results
        .map((result, index) => ({ result, category: categories[index] }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ category }) => category);

      if (failedCategories.length > 0) {
        setError(`Failed to fetch some categories: ${failedCategories.join(', ')}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch films';
      setError(errorMessage);
      console.error('Error fetching multiple film categories:', err);
    } finally {
      setLoading(false);
    }
  }, [categories, enableCache, cacheExpiry, skip]);

  const refetchAll = useCallback(async () => {
    // Clear all cache before refetching
    if (enableCache) {
      categories.forEach(category => filmStorage.remove(category));
    }
    await fetchAllFilms();
  }, [categories, enableCache, fetchAllFilms, skip]);

  const clearAllCache = useCallback(() => {
    categories.forEach(category => filmStorage.remove(category));
  }, [categories]);

  useEffect(() => {
    // Skip fetching if skip is true
    if (skip) {
      return;
    }
    
    // Always fetch films - the fetchAllFilms function will check cache internally
    fetchAllFilms();
  }, [fetchAllFilms, categories, skip]);

  return {
    filmsByCategory,
    loading,
    error,
    refetchAll,
    clearAllCache
  };
}; 