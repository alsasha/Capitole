import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { Routes, Route } from 'react-router-dom';
import { WishListProvider } from './context/WishListContext';
import Home from './components/Home';
import FilmDetail from './components/FilmDetail';
import WishList from './components/WishList';

function App() {
  return (
    <WishListProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </WishListProvider>
  );
}

export default App;
