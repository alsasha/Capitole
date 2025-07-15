import { Routes, Route, useParams } from 'react-router-dom';
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

// Wrapper component to force re-rendering when id changes
const FilmDetailWrapper = ({ initialData }: { initialData?: any }) => {
  const { id } = useParams<{ id: string }>();
  return <FilmDetail key={id} initialData={initialData} />;
};

function App({ initialData }: AppProps) {
  return (
    <WishListProvider>
      <Routes>
        <Route path="/" element={<Home initialData={initialData} />} />
        <Route 
          path="/film/:id" 
          element={<FilmDetailWrapper initialData={initialData} />} 
        />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </WishListProvider>
  );
}

export default App;
