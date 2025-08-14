"use client";
import Image from "next/image";

const HeaderSkeleton = () => {
  return (
    <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 md:px-0 py-4 md:w-11/12">
        <div className="flex items-center justify-between">
          {/* Logo Always Visible */}
          <div className="flex items-center space-x-2">
            <Image
              height={50}
              width={50}
              alt="logo"
              src="https://i.ibb.co/Xr95bbkT/Ecommerce-Logo-Keno-Buy-in-Teal-and-Gray-removebg-preview.png"
              className="animate-pulse"
            />
          </div>

          {/* Rest Hidden in Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
