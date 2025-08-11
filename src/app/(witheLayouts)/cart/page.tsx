/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useGetCart,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/hooks/cart.hook";
import CartPageSkeleton from "@/components/skeleton/CartPageSkeleton";

const CartPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // On mount, get email from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      if (email) {
        setUserEmail(email);
      }
    }
  }, []);

  const { data: cartData, isLoading } = useGetCart(userEmail || "");
  const removeFromCart = useRemoveFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  if (!userEmail) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No user session found.</p>
      </div>
    );
  }

  if (isLoading) {
    return <CartPageSkeleton />;
  }

  if (!cartData || cartData.items?.length === 0) {
    return (
      <div className="text-center p-4">
        <Image
          src="https://w7.pngwing.com/pngs/675/43/png-transparent-empty-cart-illustration.png"
          alt="Empty Cart"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-4">
          It seems you have not added anything to your cart yet.
        </p>
        <Button variant="default" asChild className="w-full max-w-xs mx-auto">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cartData.items.reduce(
    (total: number, item: any) =>
      total + item?.product?.discountedPrice * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const handleRemoveItem = (productId: string) => {
    if (!userEmail) return;

    removeFromCart.mutate(
      { userId: userEmail, productId },
      {
        onSuccess: () => {
          // Update localStorage
          const storedItems = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
          );
          const updatedItems = storedItems.filter(
            (i: any) => i.productId !== productId
          );
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));

          // Trigger update event
          window.dispatchEvent(new Event("cartUpdated"));
        },
      }
    );
  };

  const handleClearCart = () => {
    if (!userEmail) return;

    clearCartMutation.mutate(userEmail, {
      onSuccess: () => {
        // Clear localStorage
        localStorage.setItem("cartItems", "[]");

        // Trigger update event
        window.dispatchEvent(new Event("cartUpdated"));
      },
    });
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClearCart}
          disabled={clearCartMutation.isPending}
        >
          <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.items.map((item: any) => (
            <Card key={item._id} className="flex items-center gap-4 p-4">
              <div className="w-24 h-24 relative rounded overflow-hidden">
                <Image
                  src={item?.product?.images[0]}
                  alt={item?.product?.Title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item?.product?.Title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-semibold">
                    ৳{item?.product?.discountedPrice}
                  </span>
                  <Badge variant="outline">Qty: {item?.quantity}</Badge>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveItem(item.product._id)}
                disabled={removeFromCart.isPending}
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full" variant="default">
                Proceed to Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
