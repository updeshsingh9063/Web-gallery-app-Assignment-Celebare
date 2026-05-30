import React from 'react';

/**
 * SearchBar component — light theme with white card input
 * @param {string}   value        - Current search value
 * @param {Function} onChange     - Handler for input changes
 * @param {number}   resultCount  - Number of matching results
 */
const SearchBar = ({ value, onChange, resultCount }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative group">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by author name…"
          className="w-full pl-12 pr-16 py-4 bg-white border border-purple-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        />

        {/* Result count badge */}
        {value && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            <span className="px-2.5 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-lg border border-purple-200">
              {resultCount}
            </span>
          </div>
        )}
      </div>

      {/* Helper text */}
      {value && (
        <p className="text-center text-gray-400 text-xs mt-2">
          Showing{' '}
          <span className="text-purple-600 font-semibold">{resultCount}</span>{' '}
          result{resultCount !== 1 ? 's' : ''} for &ldquo;{value}&rdquo;
        </p>
      )}
    </div>
  );
};

export default SearchBar;
