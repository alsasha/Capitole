/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: 'f27c12c42bb2885984432da56b300c1b',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  DEFAULT_LANGUAGE: 'en-US',
  DEFAULT_PAGE: 1,
  SORT_BY: 'popularity.desc'
} as const;

// Film Categories
export const FILM_CATEGORIES = {
  COMEDY: 'comedy',
  HORROR: 'horror',
  SCIFI: 'scifi'
} as const;

export type FilmCategory = typeof FILM_CATEGORIES[keyof typeof FILM_CATEGORIES];

// Storage Keys
export const STORAGE_KEYS = {
  FILMS: {
    COMEDY: 'comedy',
    HORROR: 'horror',
    SCIFI: 'scifi'
  },
  WISHLIST: 'wishlist'
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_EXPIRY: 60 * 60 * 1000, // 1 hour
  WISHLIST_EXPIRY: 0, // No expiry
  FILM_DETAIL_EXPIRY: 30 * 60 * 1000 // 30 minutes
} as const;

// UI Configuration
export const UI_CONFIG = {
  LOADING: {
    TEXT: 'Loading films...',
    ERROR_TEXT: 'Failed to load films'
  },
  WISHLIST: {
    EMPTY_TEXT: 'Your Wishlist is Empty',
    EMPTY_DESCRIPTION: 'Start exploring films and add them to your wishlist!',
    EXPLORE_BUTTON_TEXT: 'Explore Films'
  },
  FILM_CARD: {
    DEFAULT_IMAGE_SIZE: 'w500' as const,
    FALLBACK_IMAGE: '/placeholder-poster.jpg'
  }
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  FILM_DETAIL: '/film/:id',
  WISHLIST: '/wishlist'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FILMS: 'Failed to fetch films',
  FETCH_FILM: 'Failed to fetch film',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  STORAGE_ERROR: 'Failed to save data locally',
  UNKNOWN_ERROR: 'An unexpected error occurred'
} as const;

// Image Sizes
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w500',
    LARGE: 'w780',
    ORIGINAL: 'original'
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original'
  }
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGES: 500 // TMDB limit
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
} as const; 