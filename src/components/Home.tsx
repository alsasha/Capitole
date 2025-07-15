import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFilmsByCategory, getImageUrl, type Film } from '../services/api';
import './Home.scss';

const Home: React.FC = () => {
  const [comedyFilms, setComedyFilms] = useState<Film[]>([]);
  const [horrorFilms, setHorrorFilms] = useState<Film[]>([]);
  const [scifiFilms, setScifiFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFilms = async () => {
      try {
        const [comedy, horror, scifi] = await Promise.all([
          fetchFilmsByCategory('comedy'),
          fetchFilmsByCategory('horror'),
          fetchFilmsByCategory('scifi')
        ]);

        setComedyFilms(comedy);
        setHorrorFilms(horror);
        setScifiFilms(scifi);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFilms();
  }, []);

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