import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchFilmById, getImageUrl, type Film, GENRE_CATEGORIES } from '../services/api';
import { useWishList } from '../context/WishListContext';
import './FilmDetail.scss';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishList, removeFromWishList, isInWishList } = useWishList();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id) return;
      
      try {
        const filmData = await fetchFilmById(id);
        setFilm(filmData);
        console.log('filmData', filmData);
        
        // Determine category based on film's primary genre
        if (filmData && filmData.genres) {
          const genreIds = filmData.genres.map(genre => genre.id);
          // Check if film has any of our main genre categories
          if (genreIds.includes(GENRE_CATEGORIES.comedy.id)) {
            setCategory('comedy');
          } else if (genreIds.includes(GENRE_CATEGORIES.horror.id)) {
            setCategory('horror');
          } else if (genreIds.includes(GENRE_CATEGORIES.scifi.id)) {
            setCategory('scifi');
          } else {
            // Default to comedy if no matching genre
            setCategory('comedy');
          }
        }
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  const handleWishListToggle = () => {
    if (!film) return;
    
    if (isInWishList(film.id)) {
      removeFromWishList(film.id);
    } else {
      addToWishList(film);
    }
  };

  if (loading) {
    return <div className="loading">Loading film details...</div>;
  }

  if (!film) {
    return (
      <div className="error">
        <h2>Film not found</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  const inWishList = isInWishList(film.id);

  console.log('category', category);
  return (
    <div className={`film-detail film-detail--${category}`}>
      <div className="film-detail__backdrop">
        <img 
          src={getImageUrl(film.backdrop_path, 'original')} 
          alt={film.title}
        />
        <div className="film-detail__backdrop-overlay"></div>
      </div>

      <div className="film-detail__content">
        <header className="film-detail__header">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            ← Back
          </button>
          <Link to="/wishlist" className="wishlist-link">
            My Wishlist
          </Link>
        </header>

        <div className="film-detail__main">
          <div className="film-detail__poster">
            <img 
              src={getImageUrl(film.poster_path, 'w780')} 
              alt={film.title}
            />
          </div>

          <div className="film-detail__info">
            <h1 className="film-detail__title">{film.title}</h1>
            
            <div className="film-detail__meta">
              <span className="film-detail__rating">★ {film.vote_average.toFixed(1)}</span>
              <span className="film-detail__year">
                {new Date(film.release_date).getFullYear()}
              </span>
            </div>

            <p className="film-detail__overview">{film.overview}</p>

            <button 
              onClick={handleWishListToggle}
              className={`wishlist-button wishlist-button--${category} ${
                inWishList ? 'wishlist-button--active' : ''
              }`}
            >
              {inWishList ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail; 