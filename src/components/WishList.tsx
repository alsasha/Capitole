import React from 'react';
import { Link } from 'react-router-dom';
import { useWishList } from '../context/WishListContext';
import { FilmCard, EmptyState, Button } from './ui';
import './WishList.scss';

const WishList: React.FC = () => {
  const { wishList, removeFromWishList, clearWishList } = useWishList();

  if (wishList.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Start exploring films and add them to your wishlist!"
        actionText="Explore Films"
        actionLink="/"
      />
    );
  }

  return (
    <main className="wishlist">
      <header className="wishlist__header">
        <h1>My Wishlist ({wishList.length} films)</h1>
        <nav aria-label="Wishlist navigation" className="wishlist__header-actions">
          <Button 
            onClick={clearWishList}
            variant="danger"
            size="medium"
            aria-label="Clear all films from wishlist"
          >
            Clear All
          </Button>
          <Link to="/">
            <Button variant="ghost" size="medium">
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      <section className="wishlist__content">
        <section className="wishlist__grid">
          {wishList.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              variant="grid"
              showYear={true}
              showRemoveButton={true}
              onRemove={removeFromWishList}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default WishList; 