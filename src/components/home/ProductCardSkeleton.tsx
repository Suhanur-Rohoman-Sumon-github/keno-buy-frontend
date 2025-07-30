"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ProductCardSkeleton = () => {
  return (
    <Card className="border-0">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Image skeleton */}
          <Skeleton className="w-full h-60" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Skeleton className="w-16 h-5 rounded-md" />
          </div>
        </div>

        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-3 h-3 rounded-full" />
              ))}
            </div>
            <Skeleton className="w-6 h-3" />
          </div>

          {/* Product title */}
          <Skeleton className="h-4 w-3/4 mb-2" />

          {/* Price */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>

      <div className="p-2 -mt-8 space-y-2">
        <Button disabled size="sm" className="w-full">
          <Skeleton className="h-4 w-full" />
        </Button>
        <Button disabled size="sm" variant="outline" className="w-full">
          <Skeleton className="h-4 w-full" />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
