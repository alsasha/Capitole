import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/critical.scss'
import './styles/global.scss'
import App from './App.tsx'
import { WishListProvider } from './context/WishListContext'
import './utils/cssLoader'

const initialData = (window as any).__INITIAL_DATA__;

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <WishListProvider>
        <App initialData={initialData} />
      </WishListProvider>
    </BrowserRouter>
  </StrictMode>
) 