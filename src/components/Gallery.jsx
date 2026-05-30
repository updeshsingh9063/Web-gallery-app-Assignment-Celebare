import React from 'react';
import PhotoCard from './PhotoCard';

/**
 * Gallery component that displays a grid of photo cards
 * @param {Array} photos - Array of photo objects
 * @param {Array} favourites - Array of favourite photo IDs
 * @param {Function} onToggleFavourite - Function to toggle favourite status
 */
const Gallery = ({ photos, favourites, onToggleFavourite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(photo.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
};

export default Gallery;
