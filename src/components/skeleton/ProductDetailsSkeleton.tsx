"use client";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Product Images Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-gray-200"></div>

            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2 mb-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Product name */}
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>

            {/* Stock */}
            <div className="h-6 w-20 bg-gray-200 rounded mb-6"></div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-12 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-gray-100 rounded-lg p-6 mb-16">
          <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
          <div className="h-20 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Related Products */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-60 w-full bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
