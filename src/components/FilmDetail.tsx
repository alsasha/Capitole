import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchFilmById, getImageUrl, type Film } from '../services/api';
import { useWishList } from '../context/WishListContext';
import { Button } from './ui';
import { filmUtils } from '../utils/safeData';
import './FilmDetail.scss';

interface FilmDetailProps {
  initialData?: {
    comedy?: any[];
    horror?: any[];
    scifi?: any[];
    film?: Film;
  } | null;
}

const FilmDetail: React.FC<FilmDetailProps> = ({ initialData }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishList, removeFromWishList, isInWishList } = useWishList();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    // Reset state when id changes
    setFilm(null);
    setLoading(true);
    setCategory('');

    // Check if we have SSR data for this specific film
    if (initialData?.film && initialData.film.id.toString() === id) {
      const filmData = initialData.film;
      setFilm(filmData);
      setLoading(false);
      
      // Determine category based on film's primary genre
      if (filmData && filmData.genres) {
        setCategory(filmUtils.getFilmCategory(filmData.genres));
      }
      return;
    }

    const fetchFilm = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        const filmData = await fetchFilmById(id);
        setFilm(filmData);
        
        // Determine category based on film's primary genre
        if (filmData && filmData.genres) {
          setCategory(filmUtils.getFilmCategory(filmData.genres));
        }
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id, initialData]);

  const handleWishListToggle = () => {
    if (!film) return;
    
    if (isInWishList(film.id)) {
      removeFromWishList(film.id);
    } else {
      addToWishList(film);
    }
  };

  if (loading) {
    return <main className="loading">Loading film details...</main>;
  }

  if (!film) {
    return (
      <main className="error">
        <h2>Film not found</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </main>
    );
  }

  const inWishList = isInWishList(film.id);
  // console.log('film', film);

  return (
    <main className={`film-detail film-detail--${category}`}>
      <div className="film-detail__content">
        {/* Header Section */}
        <header className="film-detail__header">
          <nav aria-label="Film detail navigation">
            <Link to="/">
              <Button 
                variant={category as any}
                size="medium"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Link>
            
            <Link to="/wishlist">
              <Button variant={"wishlist" as any} size="medium">
                My Wishlist
              </Button>
            </Link>
          </nav>
        </header>

        {/* Mid-Section: Image Area + Button/Description Area */}
        <section className="film-detail__mid-section">
          {/* Image Area */}
          <div className="film-detail__image-area">
            <img 
              src={getImageUrl(film.poster_path, 'w780')} 
              alt={film.title}
            />
          </div>

          {/* Button and Description Area */}
          <div className="film-detail__button-description-area">
            <h1 className="film-detail__title">{film.title}</h1>
            
            <div className="film-detail__meta">
              <span className="film-detail__rating"> {filmUtils.formatRating(film.vote_average)}</span>
              <span className="film-detail__year">
                {filmUtils.getYearFromDate(film.release_date)}
              </span>
            </div>

            <p className="film-detail__overview">{film.overview}</p>

            <button 
              onClick={handleWishListToggle}
              className={`wishlist-button wishlist-button--${category} ${
                inWishList ? 'wishlist-button--active' : ''
              }`}
            >
              {inWishList ? ' Remove from Wishlist' : ' Add to Wishlist'}
            </button>
          </div>
        </section>

        {/* Additional Info Area */}
        <section className="film-detail__additional-info">
          <div className="film-detail__genres">
            <h3>Genres</h3>
            <div className="genre-tags">
              {film.genres?.map(({id: genreId, name: genreName}) => {
                return (
                  <span key={genreId} className="genre-tag">
                    {genreName}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="film-detail__details">
            <h3>Details</h3>
            <div className="detail-item">
              <span className="detail-label">Release Date:</span>
              <span className="detail-value">{filmUtils.formatReleaseDate(film.release_date)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rating:</span>
              <span className="detail-value">{filmUtils.formatRating(film.vote_average)}/10</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Film ID:</span>
              <span className="detail-value">{film.id}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FilmDetail; 