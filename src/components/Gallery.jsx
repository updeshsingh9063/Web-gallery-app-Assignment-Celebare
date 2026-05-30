import React from 'react';
import PhotoCard from './PhotoCard';

/**
 * Gallery component — responsive photo grid
 * Desktop: 4 cols | Tablet: 2 cols | Mobile: 1 col
 * @param {Array}    photos            - Filtered photo objects
 * @param {Array}    favourites        - Array of favourited photo IDs
 * @param {Function} onToggleFavourite - Toggle handler
 */
const Gallery = ({ photos, favourites, onToggleFavourite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}
        >
          <PhotoCard
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggleFavourite={onToggleFavourite}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
