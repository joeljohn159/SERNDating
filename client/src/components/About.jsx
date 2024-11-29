import React from 'react';

const AboutPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">About Our Dating Website</h2>
          <button onClick={onClose} className="text-xl font-bold cursor-pointer">&times;</button>
        </div>
        <p className="mt-4">
          Welcome to our dating platform, where you can connect with like-minded individuals
          and find meaningful relationships. We prioritize privacy, safety, and the best user experience.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Copyright © 2024 Your Dating Website. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutPopup;
