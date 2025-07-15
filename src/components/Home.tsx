import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFilmsByCategory, getImageUrl, type Film } from '../services/api';
import './Home.scss';

interface HomeProps {
  initialData?: {
    comedy?: Film[];
    horror?: Film[];
    scifi?: Film[];
    film?: any;
  } | null;
}

// Local storage keys and cache expiration time (1 hour)
const STORAGE_KEYS = {
  COMEDY: 'films_comedy',
  HORROR: 'films_horror',
  SCIFI: 'films_scifi',
} as const;

// Helper functions for localStorage
const getCachedData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const setCachedData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const Home: React.FC<HomeProps> = ({ initialData }) => {
  const [comedyFilms, setComedyFilms] = useState<Film[]>(initialData?.comedy || []);
  const [horrorFilms, setHorrorFilms] = useState<Film[]>(initialData?.horror || []);
  const [scifiFilms, setScifiFilms] = useState<Film[]>(initialData?.scifi || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    // If we have initial data from SSR for the home page (not film detail), use it
    if (initialData && (initialData.comedy || initialData.horror || initialData.scifi)) {
      setComedyFilms(initialData.comedy || []);
      setHorrorFilms(initialData.horror || []);
      setScifiFilms(initialData.scifi || []);
      setLoading(false);
      
      // Cache the SSR data
      setCachedData(STORAGE_KEYS.COMEDY, initialData.comedy || []);
      setCachedData(STORAGE_KEYS.HORROR, initialData.horror || []);
      setCachedData(STORAGE_KEYS.SCIFI, initialData.scifi || []);
      return;
    }

    // Check if we have valid cached data
    const cachedComedy = getCachedData(STORAGE_KEYS.COMEDY);
    const cachedHorror = getCachedData(STORAGE_KEYS.HORROR);
    const cachedScifi = getCachedData(STORAGE_KEYS.SCIFI);
    
    if (cachedComedy && cachedHorror && cachedScifi) {
      setComedyFilms(cachedComedy);
      setHorrorFilms(cachedHorror);
      setScifiFilms(cachedScifi);
      setLoading(false);
      return;
    }

    // Otherwise, fetch data from API
    const fetchAllFilms = async () => {
      setLoading(true);
      try {
        const [comedy, horror, scifi] = await Promise.all([
          fetchFilmsByCategory('comedy'),
          fetchFilmsByCategory('horror'),
          fetchFilmsByCategory('scifi')
        ]);

        // Update state
        setComedyFilms(comedy);
        setHorrorFilms(horror);
        setScifiFilms(scifi);

        // Cache the data
        setCachedData(STORAGE_KEYS.COMEDY, comedy);
        setCachedData(STORAGE_KEYS.HORROR, horror);
        setCachedData(STORAGE_KEYS.SCIFI, scifi);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFilms();
  }, [initialData]);

  if (loading) {
    return <div className="loading">Loading films...</div>;
  }

  return (
    <div className="home">
      <header className="home__header">
        <h1>Film Explorer</h1>
        <Link to="/wishlist" className="wishlist-link">
          My Wishlist
        </Link>
      </header>

      <main className="home__content">
        <section className="carousel-section">
          <h2>Comedy Films</h2>
          <FilmCarousel films={comedyFilms} category="comedy" />
        </section>

        <section className="carousel-section">
          <h2>Horror Films</h2>
          <FilmCarousel films={horrorFilms} category="horror" />
        </section>

        <section className="carousel-section">
          <h2>Sci-Fi Films</h2>
          <FilmCarousel films={scifiFilms} category="scifi" />
        </section>
      </main>
    </div>
  );
};

interface FilmCarouselProps {
  films: Film[];
  category: string;
}

const FilmCarousel: React.FC<FilmCarouselProps> = ({ films, category }) => {
  return (
    <div className="film-carousel">
      <div className="film-carousel__container">
        {films.map((film) => (
          <Link 
            key={film.id} 
            to={`/film/${film.id}`} 
            className="film-card"
            data-category={category}
          >
            <div className="film-card__image">
              <img 
                src={getImageUrl(film.poster_path)} 
                alt={film.title}
                loading="lazy"
              />
            </div>
            <div className="film-card__info">
              <h3>{film.title}</h3>
              <p className="film-card__rating">★ {film.vote_average.toFixed(1)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 