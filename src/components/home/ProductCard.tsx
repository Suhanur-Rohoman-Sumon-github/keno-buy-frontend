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
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
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
              <Badge className="bg-destructive text-destructive-foreground">
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

          {/* Wishlist */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all ${
              isWishlisted ? "text-destructive" : "text-muted-foreground"
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </Button>

          {/* Quick Actions - Show on Hover */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Button
              className="w-full"
              size="sm"
              disabled={!inStock}
              variant={inStock ? "default" : "secondary"}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
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
                      ? "text-accent fill-current"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          {/* Product Name */}
          <Link href={`/product/${category}/${id}`}>
            <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">৳{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ৳{originalPrice}
              </span>
            )}
          </div>

          {/* Desktop Add to Cart */}
          <div className="hidden group-hover:block lg:block">
            <Button
              className="w-full"
              size="sm"
              variant="outline"
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {inStock ? "Quick Add" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
