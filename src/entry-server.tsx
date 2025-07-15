import { StrictMode } from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { WishListProvider } from './context/WishListContext'
import { fetchFilmsByCategory, fetchFilmById } from './services/api'

export async function render(url: string) {
  // Fetch all categories of films for the Home page
  let initialData = null;
  if (url === '/' || url === '') {
    try {
      const [comedy, horror, scifi] = await Promise.allSettled([
        fetchFilmsByCategory('comedy'),
        fetchFilmsByCategory('horror'),
        fetchFilmsByCategory('scifi'),
      ]);
      
      initialData = {
        comedy: comedy.status === 'fulfilled' ? comedy.value : [],
        horror: horror.status === 'fulfilled' ? horror.value : [],
        scifi: scifi.status === 'fulfilled' ? scifi.value : []
      };
    } catch (error) {
      console.error('Error fetching films for SSR:', error);
      initialData = { comedy: [], horror: [], scifi: [] };
    }
  } else if (url.startsWith('/film/')) {
    // Extract film ID from URL
    const filmId = url.split('/film/')[1];
    if (filmId) {
      try {
        const film = await fetchFilmById(filmId);
        if (film) {
          initialData = { film };
        }
      } catch (error) {
        console.error('Error fetching film for SSR:', error);
        initialData = { film: null };
      }
    }
  }

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <WishListProvider>
          <App initialData={initialData} />
        </WishListProvider>
      </StaticRouter>
    </StrictMode>
  )

  return { html, initialData }
} 