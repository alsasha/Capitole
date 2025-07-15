import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Film } from '../services/api';

interface WishListContextType {
  wishList: Film[];
  addToWishList: (film: Film) => void;
  removeFromWishList: (filmId: number) => void;
  isInWishList: (filmId: number) => boolean;
  clearWishList: () => void;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

// Local storage key for wishlist
const WISHLIST_STORAGE_KEY = 'film_wishlist';

// Helper functions for localStorage
const getWishListFromStorage = (): Film[] => {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishListToStorage = (wishList: Film[]) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishList));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

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
    const savedWishList = getWishListFromStorage();
    setWishList(savedWishList);
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveWishListToStorage(wishList);
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

  return (
    <WishListContext.Provider value={{
      wishList,
      addToWishList,
      removeFromWishList,
      isInWishList,
      clearWishList
    }}>
      {children}
    </WishListContext.Provider>
  );
}; 