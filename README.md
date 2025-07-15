# Capitole Film Application

A modern React-based film discovery application with server-side rendering, built with TypeScript, Vite, and Express.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Installation](#installation)
4. [Development Setup](#development-setup)
5. [Running the Application](#running-the-application)
6. [Production Build](#production-build)
7. [Troubleshooting](#troubleshooting)
8. [Project Structure](#project-structure)
9. [Features](#features)
10. [API Configuration](#api-configuration)

## 🎯 Prerequisites

Before setting up the project, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (v9.0.0 or higher) - comes with Node.js
  - Verify installation: `npm --version`
- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### System Requirements
- **Operating System**: macOS, Windows, or Linux
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 1GB free space
- **Network**: Internet connection for package installation and API calls

## 🎬 Project Overview

The Capitole Film Application is a modern React-based web application that provides:

- **Film Discovery**: Browse movies by genre (Comedy, Horror, Science Fiction)
- **Film Details**: View comprehensive information about individual films
- **Wishlist Management**: Save and manage your favorite films
- **Server-Side Rendering (SSR)**: Improved performance and SEO
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Technology Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: SCSS with modern CSS features
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Server**: Express.js with SSR support
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd Capitole

# Or if you have the project locally, navigate to the directory
cd /path/to/Capitole
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - React and React DOM
# - TypeScript and related types
# - Vite and plugins
# - Express.js for SSR
# - SCSS for styling
# - React Router for navigation
```

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed correctly
npm list --depth=0

# You should see all packages listed without any errors
```

## 🔧 Development Setup

### Environment Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
# Create environment file
touch .env
```

Add the following configuration (optional - the project has default values):

```env
# API Configuration
VITE_API_KEY=f27c12c42bb2885984432da56b300c1b
VITE_API_BASE_URL=https://api.themoviedb.org/3

# Server Configuration
PORT=3000
NODE_ENV=development

# Build Configuration
VITE_APP_TITLE=Capitole Film Explorer
```

### TypeScript Configuration

The project uses multiple TypeScript configurations:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js/server configuration
- `tsconfig.server.json` - Server-side rendering configuration

These are pre-configured and should work out of the box.

## 🏃‍♂️ Running the Application

### Option 1: Client-Side Development (Recommended for UI Development)

```bash
# Start the development server
npm run dev

# This will:
# - Start Vite dev server on http://localhost:5173
# - Enable Hot Module Replacement (HMR)
# - Provide fast refresh for React components
# - Show compilation errors in browser
```

**Access the application at**: http://localhost:5173

### Option 2: Server-Side Rendering Development (Full SSR Experience)

```bash
# Start the SSR development server
npm run ssr:dev

# This will:
# - Start Express server on http://localhost:3000
# - Enable SSR for better SEO and performance
# - Provide full server-side rendering experience
# - Show server logs in terminal
```

**Access the application at**: http://localhost:3000

### Option 3: Production Build with SSR

```bash
# Build the application for production
npm run ssr:build

# Start the production server
npm run ssr:serve

# This will:
# - Build optimized production bundle
# - Start production server on http://localhost:3000
# - Serve pre-rendered HTML for better performance
```

## 📦 Production Build

### Building for Production

```bash
# Build the client-side application
npm run build

# This creates:
# - Optimized JavaScript bundles
# - Minified CSS files
# - Static assets in the `dist` directory
```

### Building for SSR Production

```bash
# Build both client and server bundles
npm run ssr:build

# This creates:
# - Client bundle in `dist/client`
# - Server bundle in `dist/server`
# - Optimized for production deployment
```

### Deployment Options

#### Option 1: Static Hosting (Client-Side Only)
```bash
# Build the application
npm run build

# Deploy the `dist` folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Any static hosting service
```

#### Option 2: Node.js Hosting (With SSR)
```bash
# Build the application
npm run ssr:build

# Deploy to:
# - Heroku
# - DigitalOcean
# - AWS EC2
# - Any Node.js hosting service
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Error: listen EADDRINUSE: address already in use :::3000

# Solution: Kill the process using the port
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run ssr:dev
```

#### 2. TypeScript Compilation Errors
```bash
# Error: Module has no default export

# Solution: Check tsconfig files are properly configured
# The project includes specific configs for different environments
```

#### 3. SCSS Compilation Issues
```bash
# Error: Failed to parse SCSS

# Solution: Ensure sass is installed
npm install sass --save-dev
```

#### 4. API Key Issues
```bash
# Error: Failed to fetch films

# Solution: Verify API key in src/services/api.ts
# The project includes a default API key for development
```

#### 5. Node.js Version Issues
```bash
# Error: Unsupported Node.js version

# Solution: Update Node.js to v18 or higher
node --version
# Should show v18.x.x or higher
```

### Development Tips

#### Hot Reload Issues
```bash
# If HMR stops working:
# 1. Stop the dev server (Ctrl+C)
# 2. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### TypeScript Errors
```bash
# If TypeScript shows errors:
# 1. Restart TypeScript server in your IDE
# 2. Check tsconfig files are being used correctly
# 3. Ensure all dependencies are installed
```

## 📁 Project Structure

```
Capitole/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── Button/   # Button component
│   │   │   ├── FilmCard/ # Film card component
│   │   │   └── ...
│   │   ├── Home.tsx      # Home page component
│   │   ├── FilmDetail.tsx # Film detail component
│   │   └── WishList.tsx  # Wishlist component
│   ├── context/          # React Context providers
│   │   └── WishListContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useFilms.ts
│   ├── services/         # API services
│   │   └── api.ts
│   ├── styles/           # Global styles
│   │   └── global.scss
│   ├── utils/            # Utility functions
│   │   ├── safeData.ts   # Data processing utilities
│   │   ├── storage.ts    # LocalStorage utilities
│   │   └── cssLoader.ts  # CSS loading utilities
│   ├── constants/        # Application constants
│   │   └── index.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Client entry point
│   ├── entry-client.tsx  # Client-side entry
│   └── entry-server.tsx  # Server-side entry
├── server.ts             # Development SSR server
├── server-prod.ts        # Production SSR server
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## ✨ Features

### Core Features
- **Film Browsing**: Browse movies by genre categories
- **Film Details**: View comprehensive film information
- **Wishlist Management**: Save and manage favorite films
- **Responsive Design**: Mobile-first responsive layout
- **Search & Filter**: Find films by various criteria

### Technical Features
- **Server-Side Rendering (SSR)**: Improved SEO and performance
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Uses React 19 with latest features
- **Hot Module Replacement**: Fast development experience
- **Optimized Builds**: Production-ready optimized bundles
- **Local Storage**: Persistent wishlist data
- **Error Boundaries**: Graceful error handling
- **Loading States**: Smooth user experience

### UI/UX Features
- **Genre-Specific Styling**: Different themes for comedy, horror, sci-fi
- **Smooth Animations**: CSS transitions and animations
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading Spinners**: Visual feedback during data loading
- **Error Messages**: User-friendly error handling

## 🔑 API Configuration

The application uses The Movie Database (TMDB) API for film data.

### API Setup
1. **Default Configuration**: The project includes a default API key for development
2. **Custom API Key**: To use your own API key:
   - Sign up at: https://www.themoviedb.org/settings/api
   - Replace the API key in `src/services/api.ts`
   - Or set it as an environment variable

### API Endpoints Used
- **Film Discovery**: `/discover/movie` - Get films by genre
- **Film Details**: `/movie/{id}` - Get detailed film information
- **Image URLs**: `/t/p/{size}/{path}` - Get film posters and backdrops

### Rate Limiting
- TMDB API has rate limits
- The application includes error handling for rate limits
- Consider implementing caching for production use

## 🎯 Next Steps

After setting up the project, you can:

1. **Explore the Codebase**: Familiarize yourself with the project structure
2. **Run the Application**: Start development and explore features
3. **Customize Styling**: Modify SCSS files to match your design
4. **Add New Features**: Extend the application with additional functionality
5. **Deploy**: Build and deploy to your preferred hosting platform

## 📞 Support

If you encounter any issues:

1. **Check the Troubleshooting section** above
2. **Verify all prerequisites** are installed correctly
3. **Check the console** for error messages
4. **Review the project documentation** in README.md
5. **Check the terminal output** for detailed error information

## 🎉 Success!

Once you've completed these steps, you should have a fully functional film application running locally. The application provides a modern, responsive interface for browsing and managing film collections with server-side rendering for optimal performance.
