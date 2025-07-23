"use client";
import { useGetProductsQuery } from "@/hooks/product.hook";
import ProductCard from "./ProductCard";
import { Product, TNewProduct } from "@/types";


const FeaturedProducts = () => {
  const { data } = useGetProductsQuery();

  console.log(data);

  // Sample product data

  return (
    <section className="">
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore our Products
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {data?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
