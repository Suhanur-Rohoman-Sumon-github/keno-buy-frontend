"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  CreditCard,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data - in real app, this would come from API
  const product = {
    id: "1",
    name: "Premium Attar Collection 3pcs Set",
    price: 975,
    originalPrice: 1950,
    images: [
      "https://images.unsplash.com/photo-1592947967884-b6ab6cd7b89e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop",
    ],
    discount: 50,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description:
      "Experience the luxury of our premium attar collection. This carefully curated 3-piece set features our most popular fragrances, each crafted with the finest natural ingredients.",
    features: [
      "100% Natural ingredients",
      "Long-lasting fragrance",
      "Alcohol-free formula",
      "Traditional distillation process",
    ],
    specifications: {
      Brand: "Believers Sign",
      Volume: "3ml each",
      Type: "Attar/Essential Oil",
      Origin: "Bangladesh",
      "Shelf Life": "3 years",
    },
    category: "attar",
    tags: ["Premium", "Natural", "Traditional", "Gift Set"],
  };

  // Category-specific styling
  const getCategoryTheme = (category: string) => {
    const themes = {
      attar: {
        primary: "hsl(280, 100%, 70%)",
        bg: "bg-purple-50",
        border: "border-purple-200",
      },
      panjabi: {
        primary: "hsl(140, 100%, 60%)",
        bg: "bg-green-50",
        border: "border-green-200",
      },
      tshirt: {
        primary: "hsl(210, 100%, 60%)",
        bg: "bg-blue-50",
        border: "border-blue-200",
      },
      polo: {
        primary: "hsl(20, 100%, 60%)",
        bg: "bg-orange-50",
        border: "border-orange-200",
      },
      sneakers: {
        primary: "hsl(350, 100%, 60%)",
        bg: "bg-red-50",
        border: "border-red-200",
      },
      pants: {
        primary: "hsl(250, 100%, 60%)",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
      },
      tupi: {
        primary: "hsl(30, 100%, 60%)",
        bg: "bg-amber-50",
        border: "border-amber-200",
      },
      "natural-foods": {
        primary: "hsl(100, 100%, 40%)",
        bg: "bg-lime-50",
        border: "border-lime-200",
      },
    };
    return themes[category as keyof typeof themes] || themes.attar;
  };

  const theme = getCategoryTheme(product.category);

  // Related products
  const relatedProducts = [
    {
      id: "9",
      name: "Royal Attar - Rose",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1592947967884-b6ab6cd7b89e?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 89,
      inStock: true,
    },
    {
      id: "10",
      name: "Musk Attar - 6ml",
      price: 650,
      originalPrice: 800,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      discount: 19,
      rating: 4.6,
      reviews: 156,
      inStock: true,
    },
    {
      id: "11",
      name: "Oud Collection Set",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      inStock: true,
    },
    {
      id: "12",
      name: "Amber Attar - 3ml",
      price: 350,
      originalPrice: 450,
      image:
        "https://images.unsplash.com/photo-1592947967884-b6ab6cd7b89e?w=400&h=400&fit=crop",
      discount: 22,
      rating: 4.5,
      reviews: 234,
      inStock: true,
    },
  ];

  const handleAddToCart = () => {};

  const handleBuyNow = () => {
    // Redirect to checkout form
    window.location.href = `/checkout?product=${product.id}&quantity=${quantity}`;
  };

  const handleWishlist = () => {};

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-primary capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              className={`aspect-square rounded-lg overflow-hidden ${theme.bg} ${theme.border} border-2`}
            >
              <Image
                height={500}
                width={500}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? `${theme.border} border-primary`
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    height={500}
                    width={100}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    style={{ backgroundColor: theme.primary, color: "white" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ৳{product.originalPrice}
                    </span>
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    ✓ In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  variant="outline"
                  disabled={!product.inStock}
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1"
                  disabled={!product.inStock}
                  style={{ backgroundColor: theme.primary }}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`}
                  />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free delivery on orders over ৳500</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>100% authentic products</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="w-4 h-4 text-orange-600" />
                <span>7-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b"
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Reviews section coming soon...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
