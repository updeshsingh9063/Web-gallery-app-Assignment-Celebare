import React from 'react';

/**
 * SearchBar component for filtering photos by author name
 * @param {string} value - Current search value
 * @param {Function} onChange - Function to handle search input changes
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author name..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;
