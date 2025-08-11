/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAddToCartMutation } from "@/hooks/cart.hook";

interface ProductCardProps {
  _id?: string;
  Title?: string;
  discountedPrice?: number;
  originalPrice?: number;
  images: string[];
  discount?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  category?: string;
}

const ProductCard = ({
  _id,
  Title,
  discountedPrice,
  originalPrice,
  images,
  discount,
  rating,
  reviews,
  inStock,
  category = "attar",
}: ProductCardProps) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { mutate: addTocart } = useAddToCartMutation();

  console.log("ProductCard rendered with ID:", name);

  const handleAddToCart = () => {
    if (typeof window === "undefined") return;

    // Ensure user email exists
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      const randomEmail = `user${Math.floor(
        Math.random() * 100000
      )}@example.com`;
      localStorage.setItem("userEmail", randomEmail);
      userEmail = randomEmail;
    }

    // Update localStorage instantly for frontend badge
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingIndex = cartItems.findIndex(
      (item: any) => item.productId === _id
    );

    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push({ productId: _id, quantity: 1, name: Title });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Dispatch custom event so header updates immediately
    window.dispatchEvent(new Event("cartUpdated"));

    // Call backend mutation
    addTocart(
      { userEmail, productId: _id || "", quantity: 1 },
      {
        onSuccess: () => {
          setAddedToCart(true);
        },
        onError: (error) => {
          console.error("Add to cart failed:", error);
        },
      }
    );
  };

  return (
    <Card className="border-0">
      <Link href={`/product/${_id}`} className="group">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <Image
              height={500}
              width={500}
              src={images[0]}
              alt={"Product Title"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount && (
                <Badge className="bg-destructive text-white">
                  {discount}% OFF
                </Badge>
              )}
              {!inStock && (
                <Badge
                  variant="secondary"
                  className="bg-muted text-muted-foreground"
                >
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(rating)
                        ? "text-yellow-500 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({rating})</span>
            </div>

            <Link href={`/product/${category}/${_id}`}>
              <h3 className="font-medium text-foreground mb-2 truncate group-hover:text-primary text-xs transition-colors">
                {Title}
              </h3>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ৳{discountedPrice}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ৳{originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      <div className="p-2 -mt-8">
        <Link href={`/checkout?productId=${_id}&quantity=1`} className="w-full">
          <Button
            className="w-full"
            size="sm"
            variant="default"
            disabled={!inStock}
          >
            Buy Now
          </Button>
        </Link>
        <Button
          className="w-full mt-2"
          size="sm"
          variant="outline"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          {addedToCart ? "Added" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
