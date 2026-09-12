import React from "react";

const PartyTypeSkeleton: React.FC<{ skeletonCount?: number }> = ({
  skeletonCount = 18,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white font-sans">
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        {/* STEP 1 Subheading Skeleton */}
        <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>

        {/* Main Title Skeleton */}
        <div className="h-8 w-3/4 sm:w-1/2 bg-gray-200 rounded mb-3"></div>

        {/* Description Skeleton */}
        <div className="h-4 w-full sm:w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl shadow-sm animate-pulse"
          >
            {/* Icon Placeholder */}
            <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>

            {/* Label Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartyTypeSkeleton;
