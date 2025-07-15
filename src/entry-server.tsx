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
    const [comedy, horror, scifi] = await Promise.all([
      fetchFilmsByCategory('comedy'),
      fetchFilmsByCategory('horror'),
      fetchFilmsByCategory('scifi'),
    ]);
    initialData = { comedy, horror, scifi };
  } else if (url.startsWith('/film/')) {
    // Extract film ID from URL
    const filmId = url.split('/film/')[1];
    if (filmId) {
      const film = await fetchFilmById(filmId);
      if (film) {
        initialData = { film };
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