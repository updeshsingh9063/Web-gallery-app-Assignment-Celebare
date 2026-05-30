# Photo Gallery Web App

A React-based photo gallery application that fetches photos from the Picsum API, displays them in a responsive grid, allows searching by author name, and enables marking photos as favourites.

## Features

- Fetches 30 photos from Picsum Photos API
- Responsive grid layout (4 columns desktop, 2 tablet, 1 mobile)
- Real-time search filter by author name
- Favourite photos with localStorage persistence
- Loading and error states
- Custom hook for data fetching
- Performance optimization with useCallback and useMemo

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Hooks (useReducer, useCallback, useMemo, useEffect)

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│ ├── components/
│ │ ├── Gallery.jsx
│ │ ├── PhotoCard.jsx
│ │ ├── SearchBar.jsx
│ │ ├── Loader.jsx
│ │ └── ErrorMessage.jsx
│ ├── hooks/
│ │ └── useFetchPhotos.js
│ ├── reducers/
│ │ └── favouritesReducer.js
│ ├── pages/
│ │ └── Home.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Requirements Met

1. ✅ React + Vite + Tailwind CSS setup
2. ✅ Fetch photos from Picsum API with loading and error states
3. ✅ Responsive grid display
4. ✅ Real-time search filter
5. ✅ Favourites with useReducer and localStorage
6. ✅ Custom hook useFetchPhotos
7. ✅ useCallback and useMemo for performance
