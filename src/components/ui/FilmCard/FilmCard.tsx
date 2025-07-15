import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, type Film } from '../../../services/api';
import { ROUTES } from '../../../constants';
import { filmUtils } from '../../../utils/safeData';
import './FilmCard.scss';

export interface FilmCardProps {
  film: Film;
  variant?: 'carousel' | 'grid';
  showYear?: boolean;
  showRemoveButton?: boolean;
  onRemove?: (filmId: number) => void;
  className?: string;
}

export const FilmCard: React.FC<FilmCardProps> = ({
  film,
  variant = 'carousel',
  showYear = false,
  showRemoveButton = false,
  onRemove,
  className = ''
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(film.id);
  };

  const cardContent = (
    <>
      <div className="film-card__image">
        <img 
          src={getImageUrl(film.poster_path)} 
          alt={film.title}
          loading="lazy"
        />
      </div>
      <div className="film-card__info">
        <h3 className="film-card__title">{film.title}</h3>
        <p className="film-card__rating">★ {filmUtils.formatRating(film.vote_average)}</p>
        {showYear && film.release_date && (
          <p className="film-card__year">
            {filmUtils.getYearFromDate(film.release_date)}
          </p>
        )}
      </div>
      {showRemoveButton && (
        <button 
          onClick={handleRemove}
          className="film-card__remove"
          aria-label={`Remove ${film.title} from wishlist`}
        >
          ×
        </button>
      )}
    </>
  );

  return (
    <div className={`film-card film-card--${variant} ${className}`}>
      <Link 
        to={`${ROUTES.FILM_DETAIL.replace(':id', film.id.toString())}`}
        className="film-card__link"
      >
        {cardContent}
      </Link>
    </div>
  );
}; 