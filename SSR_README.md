# SSR (Server-Side Rendering) Setup

This project now includes handcrafted SSR with Vite + React. The setup provides both development and production modes for server-side rendering.

## Architecture

- **`src/entry-server.tsx`**: Server entry point that renders React components on the server
- **`src/entry-client.tsx`**: Client entry point that hydrates the server-rendered HTML
- **`server.ts`**: Development server with hot module replacement
- **`server-prod.ts`**: Production server that serves built files
- **`index.html`**: Template with SSR placeholder (`<!--app-html-->`)

## Available Scripts

### Development
```bash
# Start the development server with SSR
npm run ssr:dev

# The SSR server will run on http://localhost:3000
# The regular Vite dev server will run on http://localhost:5173
```

### Production
```bash
# Build the application for production
npm run ssr:build

# Serve the production build
npm run ssr:serve
```

### Regular Development (Client-only)
```bash
# Start Vite dev server (client-side only)
npm run dev

# Build for static hosting
npm run build
```

## How It Works

1. **Server-Side Rendering**: When a request comes in, the server renders the React app to HTML using `renderToString()`
2. **HTML Injection**: The rendered HTML is injected into the `index.html` template at the `<!--app-html-->` placeholder
3. **Client Hydration**: The client-side JavaScript takes over and "hydrates" the server-rendered HTML, making it interactive

## Benefits

- **SEO**: Search engines can crawl the fully rendered HTML
- **Performance**: Faster initial page load with pre-rendered content
- **Progressive Enhancement**: Works even if JavaScript is disabled
- **Better UX**: No loading spinners for initial content

## File Structure

```
src/
├── entry-server.tsx    # Server entry point
├── entry-client.tsx    # Client entry point
├── App.tsx            # Main app component
└── ...
server.ts              # Development server
server-prod.ts         # Production server
index.html             # HTML template with SSR placeholder
```

## Development Workflow

1. Run `npm run ssr:dev` to start the development server
2. The SSR server will be available at http://localhost:3000
3. Make changes to your React components
4. The server will automatically reload and re-render
5. Test both server-side rendering and client-side hydration
6. You can also run `npm run dev` for client-only development at http://localhost:5173

## Production Deployment

1. Run `npm run ssr:build` to build both client and server bundles
2. Deploy the entire project to your server
3. Run `npm run ssr:serve` to start the production server
4. The server will serve the built files and handle SSR

## Notes

- The SSR setup uses `StaticRouter` for server-side routing
- Client-side routing uses `BrowserRouter` for navigation
- All React Router routes work seamlessly in both environments
- The setup includes proper TypeScript support 