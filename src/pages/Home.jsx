import React, { useReducer, useCallback, useMemo, useEffect, useState } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import favouritesReducer from '../reducers/favouritesReducer';
import Gallery from '../components/Gallery';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Home page — main gallery view with search, favourites, and stats.
 *
 * State architecture:
 *  • useFetchPhotos  — custom hook (photos / loading / error)
 *  • useReducer      — favourites (ADD_FAVOURITE / REMOVE_FAVOURITE)
 *  • useState        — searchTerm, activeTab
 *  • useMemo         — filteredPhotos, favouriteIds  (expensive derives)
 *  • useCallback     — handleSearchChange, handleToggleFavourite (stable refs)
 */
const Home = () => {
  // ─── Data fetching via custom hook ────────────────────────────────────────
  const { photos, loading, error } = useFetchPhotos();

  // ─── Active tab: 'all' | 'favourites' ─────────────────────────────────────
  const [activeTab, setActiveTab] = useState('all');

  // ─── Favourites — initialised from localStorage ────────────────────────────
  const initializeFavourites = () => {
    try {
      const saved = localStorage.getItem('favourites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [favourites, dispatch] = useReducer(favouritesReducer, [], initializeFavourites);

  // Persist favourites to localStorage on every change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // ─── Search term ──────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');

  // useCallback — stable reference; prevents SearchBar re-render on every keystroke
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // useCallback — stable reference; depends on favourites for isFav check
  const handleToggleFavourite = useCallback(
    (photo) => {
      const isFavourite = favourites.some((fav) => fav.id === photo.id);
      dispatch({
        type: isFavourite ? 'REMOVE_FAVOURITE' : 'ADD_FAVOURITE',
        payload: photo,
      });
    },
    [favourites]
  );

  // ─── Derived state (memoised) ─────────────────────────────────────────────

  // useMemo — only recompute when photos/favourites/searchTerm/activeTab changes
  const filteredPhotos = useMemo(() => {
    const source = activeTab === 'favourites' ? favourites : photos;
    if (!searchTerm.trim()) return source;
    return source.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, favourites, searchTerm, activeTab]);

  // useMemo — flat ID array for O(n) lookup inside PhotoCard
  const favouriteIds = useMemo(() => favourites.map((fav) => fav.id), [favourites]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0fdf4 100%)',
      }}
    >
      {/* ── Ambient background orbs (light, subtle) ──────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
        />
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #34d399, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 max-w-7xl">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 border border-purple-200 rounded-full text-xs font-semibold text-purple-600 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Powered by Picsum Photos API
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
            <span className="gradient-text">Photo Gallery</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Discover stunning photography from world-class artists.
            Search, explore, and save your favourites.
          </p>

          {/* Stats bar */}
          {!loading && !error && (
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              {[
                { label: 'Photos', value: photos.length, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
                { label: 'Favourites', value: favourites.length, color: 'text-pink-600', bg: 'bg-pink-50 border-pink-200' },
                { label: 'Filtered', value: filteredPhotos.length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`rounded-2xl px-6 py-3 text-center border ${bg}`}>
                  <div className={`text-2xl font-black ${color}`}>{value}</div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        {!loading && !error && (
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 border border-purple-100 rounded-2xl p-1.5 flex gap-1 shadow-sm">
              {['all', 'favourites'].map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                      : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {tab === 'favourites' ? (
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill={activeTab === 'favourites' ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      Favourites
                      {favourites.length > 0 && (
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                            activeTab === 'favourites'
                              ? 'bg-white/25 text-white'
                              : 'bg-pink-100 text-pink-600'
                          }`}
                        >
                          {favourites.length}
                        </span>
                      )}
                    </span>
                  ) : (
                    'All Photos'
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Search ────────────────────────────────────────────────────── */}
        {!loading && !error && (
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            resultCount={filteredPhotos.length}
          />
        )}

        {/* ── Loading ────────────────────────────────────────────────────── */}
        {loading && <Loader />}

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {error && <ErrorMessage message={error} />}

        {/* ── Gallery ───────────────────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-semibold text-lg mb-1">No results found</p>
                  <p className="text-gray-400 text-sm">
                    {activeTab === 'favourites' && !searchTerm
                      ? "You haven't saved any favourites yet."
                      : `No photos match "${searchTerm}"`}
                  </p>
                </div>
              </div>
            ) : (
              <Gallery
                photos={filteredPhotos}
                favourites={favouriteIds}
                onToggleFavourite={handleToggleFavourite}
              />
            )}
          </>
        )}

        {/* ── Footer ───────────────────────────────────────────────────── */}
        {!loading && !error && (
          <footer className="mt-16 text-center text-gray-400 text-sm">
            <div className="w-12 h-px bg-purple-200 mx-auto mb-4" />
            <p>
              Photos from{' '}
              <a
                href="https://picsum.photos"
                target="_blank"
                rel="noreferrer"
                className="text-purple-500 hover:text-purple-700 transition-colors font-medium"
              >
                Picsum Photos
              </a>{' '}
              · Built with React + Vite + Tailwind CSS
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Home;
