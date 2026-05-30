import React, { useState } from 'react';

/**
 * PhotoCard component — clean white card with hover effects for light theme
 * @param {Object}   photo             - Photo object { id, author, width, height }
 * @param {boolean}  isFavourite       - Whether this photo is in favourites
 * @param {Function} onToggleFavourite - Callback to toggle favourite state
 */
const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  // Sized thumbnail — much faster than full-res download_url
  const imgSrc = `https://picsum.photos/id/${photo.id}/600/400`;

  const handleFavourite = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 300);
    onToggleFavourite(photo);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        border: '1px solid rgba(167, 139, 250, 0.15)',
        boxShadow: '0 2px 12px rgba(109, 40, 217, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(109, 40, 217, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(109, 40, 217, 0.06)';
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-52">
        {/* Shimmer placeholder */}
        {!imgLoaded && <div className="shimmer absolute inset-0" />}

        <img
          src={imgSrc}
          alt={`Photo by ${photo.author}`}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Saved badge (top-right) */}
        {isFavourite && (
          <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Saved
          </div>
        )}

        {/* Dimensions on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
            {photo.width} × {photo.height}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-4">
          {/* Initials avatar */}
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow">
            {photo.author
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="text-gray-800 text-sm font-semibold truncate leading-tight">
              {photo.author}
            </h3>
            <p className="text-gray-400 text-xs truncate">via Picsum Photos</p>
          </div>
        </div>

        {/* Favourite button */}
        <button
          id={`fav-btn-${photo.id}`}
          onClick={handleFavourite}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
            isFavourite
              ? 'bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-100'
              : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-all duration-200 ${heartAnim ? 'heart-animate' : ''} ${
              isFavourite ? 'text-pink-500' : 'text-gray-400'
            }`}
            fill={isFavourite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isFavourite ? 0 : 1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          {isFavourite ? 'Saved to Favourites' : 'Add to Favourites'}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
