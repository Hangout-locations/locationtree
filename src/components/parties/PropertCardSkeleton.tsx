const PropertyCardSkeleton = () => {
  return (
    <div className="w-full max-w-[200px] shrink-0 animate-pulse">
      {/* Image */}
      <div className="relative h-[216px] w-full overflow-hidden rounded-[24px] bg-gray-200">
        {/* Guest favorite badge */}
        <div className="absolute left-3 top-3 h-8 w-[120px] rounded-full bg-gray-300" />

        {/* Heart */}
        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-gray-300" />
      </div>

      {/* Content */}
      <div className="px-1.5 pt-2.5">
        {/* Title */}
        <div className="h-4 w-[85%] rounded bg-gray-200" />

        {/* Price + rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-4 w-[90px] rounded bg-gray-200" />
          <div className="h-4 w-[45px] rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
