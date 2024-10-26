import React from 'react';

const FilterSectionSkeleton = () => {
  return (
    <aside className="col-span-1 mb-6 md:mb-0">
      <p className="text-2xl font-semibold mb-4 bg-gray-300 rounded animate-pulse w-1/2 h-8"></p>
      <div className="bg-default-100 shadow-lg rounded-lg p-6 animate-pulse">
        
        {/* Search Field Skeleton */}
        <div className="mb-6">
          <div className="font-semibold text-lg mb-2 bg-gray-300 rounded w-1/4 h-6"></div>
          <div className="rounded-md px-4 py-2 w-full border border-default-300 bg-gray-200 h-10"></div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="mb-6">
          <div className="font-semibold text-lg mb-2 bg-gray-300 rounded w-1/4 h-6"></div>
          <div className="rounded-md px-4 py-2 w-full border border-default-300 bg-gray-200 h-10"></div>
        </div>

        {/* Upvotes Filter Skeleton */}
        <div className="mb-6">
          <div className="font-semibold text-lg mb-2 bg-gray-300 rounded w-1/3 h-6"></div>
          <div className="rounded-md px-4 py-2 w-full border border-default-300 bg-gray-200 h-10"></div>
          <div className="text-sm mt-2 bg-gray-300 rounded w-1/4 h-4"></div>
        </div>

        {/* Clear Filters Button Skeleton */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-4 py-2 rounded-md w-full h-10"></div>
      </div>
    </aside>
  );
};

export default FilterSectionSkeleton;
