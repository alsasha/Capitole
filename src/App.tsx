import { Routes, Route } from 'react-router-dom';
import { WishListProvider } from './context/WishListContext';
import Home from './components/Home';
import FilmDetail from './components/FilmDetail';
import WishList from './components/WishList';

interface AppProps {
  initialData?: {
    comedy?: any[];
    horror?: any[];
    scifi?: any[];
    film?: any;
  } | null;
}

function App({ initialData }: AppProps) {
  return (
    <WishListProvider>
      <Routes>
        <Route path="/" element={<Home initialData={initialData} />} />
        <Route path="/film/:id" element={<FilmDetail initialData={initialData} />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </WishListProvider>
  );
}

export default App;
