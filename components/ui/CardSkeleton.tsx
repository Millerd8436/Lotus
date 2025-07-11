import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

export default CardSkeleton;
