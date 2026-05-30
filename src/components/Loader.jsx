import React from 'react';

/**
 * Loader component — light-theme spinner + shimmer skeleton grid
 */
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-72 gap-6">
      {/* Dual-ring spinner */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-purple-500 animate-spin" />
        <div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-blue-400 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
        <div className="absolute inset-3 w-10 h-10 rounded-full bg-purple-100 animate-pulse" />
      </div>

      {/* Shimmer skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-white"
            style={{
              border: '1px solid rgba(167,139,250,0.15)',
              boxShadow: '0 2px 12px rgba(109,40,217,0.06)',
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div className="shimmer h-48 w-full" />
            <div className="p-4 space-y-2">
              <div className="shimmer h-4 rounded-full w-3/4" />
              <div className="shimmer h-3 rounded-full w-1/2" />
              <div className="shimmer h-9 rounded-xl w-full mt-3" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-purple-400 text-sm font-medium tracking-widest uppercase animate-pulse">
        Loading photos…
      </p>
    </div>
  );
};

export default Loader;
