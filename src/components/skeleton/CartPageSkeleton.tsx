"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CartPageSkeleton = () => {
  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="w-24 h-24 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
              <Skeleton className="h-6 w-6 rounded-full" />
            </Card>
          ))}
        </div>

        {/* Summary Skeleton */}
        <Card className="p-4">
          <CardContent>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
            <Skeleton className="h-10 w-full mt-4 rounded" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
