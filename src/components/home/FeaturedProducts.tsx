import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  // Sample product data
  const products = [
    {
      id: "1",
      name: "Premium Attar Collection 3pcs Set",
      price: 975,
      originalPrice: 1950,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
      discount: 50,
      rating: 4.8,
      reviews: 124,
      inStock: true,
    },
    {
      id: "2",
      name: "Classic Cotton Panjabi - White",
      price: 1200,
      originalPrice: 1500,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
      discount: 20,
      rating: 4.6,
      reviews: 89,
      inStock: true,
    },
    {
      id: "3",
      name: "Premium Polo Shirt - Navy Blue",
      price: 800,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      rating: 4.7,
      reviews: 156,
      inStock: true,
    },
    {
      id: "4",
      name: "Casual T-Shirt - Black",
      price: 450,
      originalPrice: 600,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      discount: 25,
      rating: 4.5,
      reviews: 203,
      inStock: false,
    },
    {
      id: "5",
      name: "Sports Sneakers - White/Blue",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      rating: 4.9,
      reviews: 67,
      inStock: true,
    },
    {
      id: "6",
      name: "Formal Trouser - Black",
      price: 1800,
      originalPrice: 2200,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
      discount: 18,
      rating: 4.4,
      reviews: 91,
      inStock: true,
    },
    {
      id: "7",
      name: "Prayer Cap (Tupi) - White",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
      inStock: true,
    },
    {
      id: "8",
      name: "Organic Honey - 500g",
      price: 650,
      originalPrice: 800,
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=500&fit=crop",
      discount: 19,
      rating: 4.6,
      reviews: 45,
      inStock: true,
    },
  ];

  return (
    <section className="">
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore our Products
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
