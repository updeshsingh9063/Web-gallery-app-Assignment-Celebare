import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import favouritesReducer from '../reducers/favouritesReducer';
import Gallery from '../components/Gallery';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Home page component with photo gallery functionality
 * Uses useReducer for state management, useCallback for performance, and useMemo for memoization
 */
const Home = () => {
  // Fetch photos using custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Initialize favourites from localStorage
  const initializeFavourites = () => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  };

  // useReducer for managing favourites state
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initializeFavourites);

  // Persist favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Search state
  const [searchTerm, setSearchTerm] = React.useState('');

  // useCallback for search handler - memoized to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Toggle favourite status
  const handleToggleFavourite = useCallback((photo) => {
    const isFavourite = favourites.some(fav => fav.id === photo.id);
    
    if (isFavourite) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: photo });
    } else {
      dispatch({ type: 'ADD_FAVOURITE', payload: photo });
    }
  }, [favourites]);

  // useMemo for filtered photos - only recompute when photos or searchTerm changes
  const filteredPhotos = useMemo(() => {
    if (!searchTerm) return photos;
    
    return photos.filter(photo =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  // Get array of favourite IDs for quick lookup
  const favouriteIds = useMemo(() => {
    return favourites.map(fav => fav.id);
  }, [favourites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Photo Gallery
        </h1>

        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        {loading && <Loader />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          <div>
            {filteredPhotos.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">
                No photos found matching your search.
              </p>
            ) : (
              <Gallery
                photos={filteredPhotos}
                favourites={favouriteIds}
                onToggleFavourite={handleToggleFavourite}
              />
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {favourites.length} {favourites.length === 1 ? 'favourite' : 'favourites'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
