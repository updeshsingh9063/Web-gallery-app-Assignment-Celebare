import React from 'react';

/**
 * ErrorMessage component — light-theme error card with icon and retry button
 * @param {string} message - Error message to display
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-72 px-4">
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        style={{
          border: '1px solid rgba(239, 68, 68, 0.2)',
          boxShadow: '0 4px 24px rgba(239, 68, 68, 0.08)',
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h2>

        {/* Message */}
        <p className="text-gray-400 text-sm mb-6">{message}</p>

        {/* Retry */}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
