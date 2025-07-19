"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  discount,
  rating,
  reviews,
  inStock,
  category = "attar",
}: ProductCardProps) => {
  return (
    <Card className="     border-0">
      <Link href={`/product/${id}`} className="group">
        <CardContent className="p-0">
          <div className="relative  overflow-hidden ">
            <Image
              height={500}
              width={500}
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
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
            {/* Rating */}
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
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>

            {/* Product Name */}
            <Link href={`/product/${category}/${id}`}>
              <h3 className="font-medium text-foreground mb-2 truncate group-hover:text-primary text-xs transition-colors">
                {name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex items-center gap-2 ">
              <span className="text-lg font-bold text-primary">৳{price}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ৳{originalPrice}
                </span>
              )}
            </div>

            {/* Always Visible Buttons */}
          </div>
        </CardContent>
      </Link>
      <div className="p-2 -mt-8">
        <Link href={"/checkout"} className="w-full">
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
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
