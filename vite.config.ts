import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'entry-server': './src/entry-server.tsx'
      }
    }
  },
  ssr: {
    noExternal: ['react-router-dom']
  }
})
