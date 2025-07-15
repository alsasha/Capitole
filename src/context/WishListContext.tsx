import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Film } from '../services/api';
import { wishlistStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

interface WishListContextType {
  wishList: Film[];
  addToWishList: (film: Film) => void;
  removeFromWishList: (filmId: number) => void;
  isInWishList: (filmId: number) => boolean;
  clearWishList: () => void;
  getWishListCount: () => number;
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishList = wishlistStorage.get<Film[]>(STORAGE_KEYS.WISHLIST) || [];
    setWishList(savedWishList);
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      wishlistStorage.set(STORAGE_KEYS.WISHLIST, wishList);
    }
  }, [wishList, isInitialized]);

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

  const clearWishList = () => {
    setWishList([]);
  };

  const getWishListCount = () => {
    return wishList.length;
  };

  return (
    <WishListContext.Provider value={{
      wishList,
      addToWishList,
      removeFromWishList,
      isInWishList,
      clearWishList,
      getWishListCount
    }}>
      {children}
    </WishListContext.Provider>
  );
}; 