import React from 'react';

/**
 * PhotoCard component that displays a single photo with author name and heart button
 * @param {Object} photo - Photo object containing id, url, author
 * @param {boolean} isFavourite - Whether the photo is in favourites
 * @param {Function} onToggleFavourite - Function to toggle favourite status
 */
const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {photo.author}
        </h3>
        <button
          onClick={() => onToggleFavourite(photo)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isFavourite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isFavourite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {isFavourite ? 'Favourited' : 'Favourite'}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
