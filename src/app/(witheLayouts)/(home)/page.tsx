import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      {/* <Categories /> */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <FeaturedProducts />
      </React.Suspense>
    </div>
  );
};

export default page;
