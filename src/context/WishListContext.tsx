import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Film } from '../services/api';

interface WishListContextType {
  wishList: Film[];
  addToWishList: (film: Film) => void;
  removeFromWishList: (filmId: number) => void;
  isInWishList: (filmId: number) => boolean;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};

interface WishListProviderProps {
  children: ReactNode;
}

export const WishListProvider: React.FC<WishListProviderProps> = ({ children }) => {
  const [wishList, setWishList] = useState<Film[]>([]);

  const addToWishList = (film: Film) => {
    setWishList(prev => {
      if (!prev.find(f => f.id === film.id)) {
        return [...prev, film];
      }
      return prev;
    });
  };

  const removeFromWishList = (filmId: number) => {
    setWishList(prev => prev.filter(film => film.id !== filmId));
  };

  const isInWishList = (filmId: number) => {
    return wishList.some(film => film.id === filmId);
  };

  return (
    <WishListContext.Provider value={{
      wishList,
      addToWishList,
      removeFromWishList,
      isInWishList
    }}>
      {children}
    </WishListContext.Provider>
  );
}; 