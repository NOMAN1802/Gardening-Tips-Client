import React from 'react';

const UserPostCountSkeleton = () => {
  return (
    <aside className="col-span-1 mt-6 md:mt-0">
      <h3 className="text-2xl font-semibold mb-4 bg-gray-300 rounded w-1/2 h-8 animate-pulse"></h3>
      <div className="bg-default-100 rounded-lg p-4 shadow-md">
        
        {/* Skeleton for Each User Card */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-default-300 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 flex items-center animate-pulse"
          >
            {/* Avatar Skeleton */}
            <div className="relative">
              <div className="rounded-full bg-gray-300 w-12 h-12"></div>
            </div>

            {/* User Info Skeleton */}
            <div className="mx-auto px-4 w-full">
              <div className="font-semibold bg-gray-300 rounded w-1/3 h-4 mb-2"></div>
              <div className="text-sm bg-gray-300 rounded w-1/2 h-4 mb-2"></div>
              <div className="text-sm bg-gray-300 rounded w-1/4 h-4"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default UserPostCountSkeleton;
