import React from 'react';
import { Link } from 'react-router-dom';
import { useWishList } from '../context/WishListContext';
import { getImageUrl, formatRating } from '../services/api';
import SafeImage from './SafeImage';
import './WishList.scss';

const WishList: React.FC = () => {
  const { wishList, removeFromWishList } = useWishList();

  if (wishList.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty__content">
          <h1>Your Wishlist is Empty</h1>
          <p>Start exploring films and add them to your wishlist!</p>
          <Link to="/" className="explore-button">
            Explore Films
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <header className="wishlist__header">
        <h1>My Wishlist</h1>
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </header>

      <main className="wishlist__content">
        <div className="wishlist__grid">
          {wishList.map((film) => (
            <div key={film.id} className="wishlist-item">
              <Link to={`/film/${film.id}`} className="wishlist-item__link">
                <div className="wishlist-item__image">
                  <SafeImage 
                    src={getImageUrl(film.poster_path)} 
                    alt={film.title || 'Film poster'}
                    loading="lazy"
                  />
                </div>
                <div className="wishlist-item__info">
                  <h3>{film.title || 'Untitled'}</h3>
                  <p className="wishlist-item__rating">★ {formatRating(film.vote_average)}</p>
                  <p className="wishlist-item__year">
                    {film.release_date ? new Date(film.release_date).getFullYear() : 'Unknown'}
                  </p>
                </div>
              </Link>
              <button 
                onClick={() => removeFromWishList(film.id)}
                className="wishlist-item__remove"
                aria-label={`Remove ${film.title} from wishlist`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WishList; 