import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, type Film } from '../services/api';
import { useMultipleFilms } from '../hooks/useFilms';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';
import { FILM_CATEGORIES, ROUTES, UI_CONFIG } from '../constants';
import './Home.scss';

interface HomeProps {
  initialData?: {
    comedy?: Film[];
    horror?: Film[];
    scifi?: Film[];
    film?: any;
  } | null;
}

const Home: React.FC<HomeProps> = ({ initialData }) => {
  const categories = React.useMemo(() => Object.values(FILM_CATEGORIES), []);
  
  // Only use the hook if we don't have SSR data for the home page
  // Check if we have actual home page data (not film detail data)
  const hasSSRData = !!(initialData && 
    (Array.isArray(initialData.comedy) || 
     Array.isArray(initialData.horror) || 
     Array.isArray(initialData.scifi)));
  
  const {
    filmsByCategory,
    loading,
    error,
    refetchAll
  } = useMultipleFilms({
    categories,
    enableCache: true,
    skip: hasSSRData // Add skip option to prevent fetching when we have SSR data
  });

  // Use initial data if available (SSR) and contains home page data


  const films = hasSSRData
    ? {
        comedy: Array.isArray(initialData.comedy) ? initialData.comedy : [],
        horror: Array.isArray(initialData.horror) ? initialData.horror : [],
        scifi: Array.isArray(initialData.scifi) ? initialData.scifi : []
      }
    : filmsByCategory;



  if (loading && !initialData) {
    return (
      <div className="home">
        <LoadingSpinner 
          size="large" 
          text={UI_CONFIG.LOADING.TEXT}
          className="home__loading"
        />
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="home">
        <ErrorMessage 
          message={error}
          onRetry={refetchAll}
          className="home__error"
        />
      </div>
    );
  }

  return (
    <div className="home">
      <header className="home__header">
        <h1>Film Explorer</h1>
        <Link to={ROUTES.WISHLIST} className="wishlist-link">
          My Wishlist
        </Link>
      </header>

      <main className="home__content">
        <section className="carousel-section">
          <h2>Comedy Films</h2>
          <FilmCarousel 
            films={films.comedy || []} 
            category={FILM_CATEGORIES.COMEDY} 
          />
        </section>

        <section className="carousel-section">
          <h2>Horror Films</h2>
          <FilmCarousel 
            films={films.horror || []} 
            category={FILM_CATEGORIES.HORROR} 
          />
        </section>

        <section className="carousel-section">
          <h2>Sci-Fi Films</h2>
          <FilmCarousel 
            films={films.scifi || []} 
            category={FILM_CATEGORIES.SCIFI} 
          />
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
  if (films.length === 0) {
    return (
      <div className="film-carousel film-carousel--empty">
        <p>No films available in this category.</p>
      </div>
    );
  }

  return (
    <div className="film-carousel">
      <div className="film-carousel__container">
        {films.map((film) => (
          <Link 
            key={film.id} 
            to={`${ROUTES.FILM_DETAIL.replace(':id', film.id.toString())}`}
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