# Capitole Film Application

A modern React-based film discovery application with server-side rendering, built with TypeScript, Vite, and Express.

## 🚀 Quick Start (SSR)

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation & Running

1. **Clone and install dependencies**
   ```bash
   # Using GitHub CLI
   gh repo clone alsasha/Capitole
   cd Capitole
   
   # Or using git directly
   git clone https://github.com/alsasha/Capitole.git
   cd Capitole
   
   npm install
   ```

2. **Run with SSR (Recommended)**
   ```bash
   npm run ssr:dev
   ```
   Access at: http://localhost:3000

3. **Alternative: Client-side only**
   ```bash
   npm run dev
   ```
   Access at: http://localhost:5173

## 📦 Production Build

```bash
# Build for production with SSR
npm run ssr:build
npm run ssr:serve
```

## 🎯 Features

- **Film Discovery**: Browse movies by genre (Comedy, Horror, Science Fiction)
- **Film Details**: View comprehensive film information
- **Wishlist Management**: Save and manage favorite films
- **Server-Side Rendering**: Improved SEO and performance
- **Responsive Design**: Works on all devices

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: SCSS
- **Server**: Express.js with SSR
- **API**: The Movie Database (TMDB)

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   ├── Home.tsx      # Home page
│   ├── FilmDetail.tsx # Film details
│   └── WishList.tsx  # Wishlist
├── context/          # React Context
├── hooks/            # Custom hooks
├── services/         # API services
├── styles/           # Global styles
├── utils/            # Utilities
├── App.tsx           # Main app
├── main.tsx          # Client entry
└── entry-server.tsx  # Server entry
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill -9
```

### TypeScript Errors
```bash
# Restart TypeScript server in your IDE
# Ensure all dependencies are installed
```

### API Issues
The project includes a default API key for development. For production, replace the key in `src/services/api.ts`.

## 📞 Support

Check the console and terminal for error messages. The application includes comprehensive error handling and loading states.
