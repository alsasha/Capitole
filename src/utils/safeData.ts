import { GENRE_CATEGORIES } from '../services/api';

/**
 * Utility functions for safe data processing and formatting
 */

// Film data utilities
export const filmUtils = {
  /**
   * Format rating to one decimal place
   */
  formatRating: (rating: number): string => {
    return rating.toFixed(1);
  },

  /**
   * Get year from release date
   */
  getYearFromDate: (dateString: string): number => {
    return new Date(dateString).getFullYear();
  },

  /**
   * Format release date for display
   */
  formatReleaseDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  },

  /**
   * Determine film category based on genres
   */
  getFilmCategory: (genres: Array<{ id: number; name: string }>): string => {
    if (!genres || genres.length === 0) {
      return 'comedy'; // Default fallback
    }

    const genreIds = genres.map(genre => genre.id);
    
    if (genreIds.includes(GENRE_CATEGORIES.comedy.id)) {
      return 'comedy';
    } else if (genreIds.includes(GENRE_CATEGORIES.horror.id)) {
      return 'horror';
    } else if (genreIds.includes(GENRE_CATEGORIES.scifi.id)) {
      return 'scifi';
    } else {
      return 'comedy'; // Default fallback
    }
  },

  /**
   * Get primary genre name
   */
  getPrimaryGenre: (genres: Array<{ id: number; name: string }>): string => {
    if (!genres || genres.length === 0) {
      return 'Unknown';
    }
    return genres[0].name;
  },

  /**
   * Check if film has specific genre
   */
  hasGenre: (genres: Array<{ id: number; name: string }>, genreId: number): boolean => {
    if (!genres) return false;
    return genres.some(genre => genre.id === genreId);
  }
};

// Validation utilities
export const validationUtils = {
  /**
   * Check if value is valid number
   */
  isValidNumber: (value: any): boolean => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  },

  /**
   * Check if value is valid date string
   */
  isValidDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },

  /**
   * Check if value is valid string
   */
  isValidString: (value: any): boolean => {
    return typeof value === 'string' && value.trim().length > 0;
  }
};

// Formatting utilities
export const formatUtils = {
  /**
   * Truncate text to specified length
   */
  truncateText: (text: string, maxLength: number, suffix: string = '...'): string => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - suffix.length) + suffix;
  },

  /**
   * Format number with commas
   */
  formatNumber: (num: number): string => {
    return num.toLocaleString();
  },

  /**
   * Capitalize first letter
   */
  capitalize: (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}; 