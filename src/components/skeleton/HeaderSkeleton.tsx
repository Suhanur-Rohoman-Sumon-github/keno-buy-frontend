"use client";

const HeaderSkeleton = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 py-4 md:w-11/12">
          <div className="flex items-center justify-between animate-pulse">
            {/* Logo & Menu */}
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gray-200 rounded"></div>
              <div className="h-10 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gray-200 rounded hidden md:flex"></div>
              <div className="h-10 w-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Skeleton */}
      <div className="hidden md:block w-64 p-4">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="h-4 w-40 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeaderSkeleton;
