"use client";

import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/hooks/product.hook";
import { Product } from "@/types";

// Mock JSON for loading state (matches your provided structure)
const mockProducts = [
  {
    _id: "6896ebe9e20bda58f95980be",
    Title: "t-shirt",
    discountedPrice: 600,
    buyPrice: 100,
    originalPrice: 1000,
    discount: 40,
    inStock: true,
    stock: 99,
    rating: 5,
    reviews: 0,
    category: "Pants & Trouser",
    images: [
      "https://res.cloudinary.com/dfnvkgvmp/image/upload/v1754721257/q1gz56bl88-1754721255461-images-download.jpg",
      "https://res.cloudinary.com/dfnvkgvmp/image/upload/v1754721257/2gcg4jxim79-1754721255461-images-download%20%281%29.jpg",
    ],
    tags: [],
    features: [],
    createdAt: "2025-08-09T06:34:17.794+00:00",
    updatedAt: "2025-08-09T06:34:17.794+00:00",
    __v: 0,
  },
  {
    _id: "6899cdd5349d2018fdb4c670",
    Title: "Organic Green Tea",
    Description: "Premium organic green tea leaves sourced from the Himalayas.",
    discountedPrice: 8.792,
    buyPrice: 6.5,
    originalPrice: 10.99,
    discount: 20,
    inStock: true,
    stock: 150,
    rating: 5,
    reviews: 0,
    category: "Beverages",
    images: [
      "https://res.cloudinary.com/dfnvkgvmp/image/upload/v1754910162/clzgvb3nx2a-1754910160864-images-1.jpg",
      "https://res.cloudinary.com/dfnvkgvmp/image/upload/v1754910163/4fiegtwg.jpg",
    ],
    tags: [],
    features: [],
    createdAt: "2025-08-11T11:02:45.343+00:00",
    updatedAt: "2025-08-11T11:02:45.343+00:00",
    __v: 0,
  },
];

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(
    {
      category: "featured",
      sort: "createdAt",
    },
    { keepPreviousData: true }
  );

  const products = isLoading ? mockProducts : data;

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore our Products
      </h2>
      <div className="container mx-auto px-4">
        {/* Show JSON when loading */}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
