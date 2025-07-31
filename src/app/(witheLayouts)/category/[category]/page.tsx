"use client";

import { useParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/hooks/product.hook";
import { Product } from "@/types";
import ProductCardSkeleton from "@/components/home/ProductCardSkeleton";
import ProductCard from "@/components/home/ProductCard";

const CategoryProducts = () => {
  const { id } = useParams(); // Get dynamic segment: category/[id]

  const { data, isLoading } = useGetAllProductsQuery(
    {
      category: id as string,
      sort: "createdAt",
      searchTerm: "", // no searchTerm here
    },
    { keepPreviousData: true }
  );

  return (
    <section>
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

export default CategoryProducts;
