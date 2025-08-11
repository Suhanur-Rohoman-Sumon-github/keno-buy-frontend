/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ReviewPage from "@/components/revew/RevewPage";
import { useParams } from "next/navigation";
import { useGetSingleProduct } from "@/hooks/product.hook";
import ProductCardSkeleton from "@/components/home/ProductCardSkeleton";

const ProductDetails = () => {
  const { productId } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useGetSingleProduct(productId as string);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

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

  const theme = getCategoryTheme(product?.category);

  // Related products

  const handleBuyNow = (id: any) => {
    // Redirect to checkout form
    window.location.href = `/checkout?productId=${id}&quantity=${quantity}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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
              {product.images.map((image: string, index: number) => (
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
                {product.tags.map((tag: any) => (
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
                  ৳{product.discountedPrice * quantity}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ৳{product.originalPrice * quantity}
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
                  onClick={() => handleBuyNow(product._id)}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
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

        {/* <Card className="mb-16">
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
                      {product.features.map(
                        (feature: string, index: number) => (
                          <li key={index} className="text-muted-foreground">
                            {feature}
                          </li>
                        )
                      )}
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
                  <ReviewPage />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default ProductDetails;
