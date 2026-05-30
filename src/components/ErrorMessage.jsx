import React from 'react';

/**
 * ErrorMessage component to display error state
 * @param {string} message - Error message to display
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error: {message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
