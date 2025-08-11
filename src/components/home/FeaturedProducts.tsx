"use client";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useGetAllProductsQuery } from "@/hooks/product.hook";
import { Product } from "@/types";

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(
    {
      category: "featured",
      sort: "createdAt",
    },
    { keepPreviousData: true }
  );

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore our Products
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : data?.map((product: Product) => (
                <ProductCard key={product._id} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
