const API_KEY = 'f27c12c42bb2885984432da56b300c1b';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Genre {
  id: number;
  name: string;
}

export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
}

export interface ApiResponse {
  results: Film[];
  total_pages: number;
  total_results: number;
}

// Genre mapping for our three main categories
export const GENRE_CATEGORIES = {
  comedy: { id: 35, name: 'Comedy' },
  horror: { id: 27, name: 'Horror' },
  scifi: { id: 878, name: 'Science Fiction' }
} as const;

export const fetchFilmsByGenre = async (genreId: number): Promise<Film[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}&sort_by=popularity.desc`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch films: ${response.status} ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error; // Re-throw to allow components to handle errors
  }
};

export const fetchFilmsByCategory = async (category: string): Promise<Film[]> => {
  // Map old categories to new genre-based approach
  switch (category) {
    case 'comedy':
      return fetchFilmsByGenre(GENRE_CATEGORIES.comedy.id);
    case 'horror':
      return fetchFilmsByGenre(GENRE_CATEGORIES.horror.id);
    case 'scifi':
      return fetchFilmsByGenre(GENRE_CATEGORIES.scifi.id);
    default:
      return fetchFilmsByGenre(GENRE_CATEGORIES.comedy.id);
  }
};

export const fetchFilmById = async (id: string): Promise<Film | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=genres`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Film not found');
      }
      throw new Error(`Failed to fetch film: ${response.status} ${response.statusText}`);
    }
    
    const data: Film = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching film:', error);
    throw error; // Re-throw to allow components to handle errors
  }
};

export const getImageUrl = (path: string, size: 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Re-export safe data utilities
export { formatDate, formatRating } from '../utils/safeData'; 