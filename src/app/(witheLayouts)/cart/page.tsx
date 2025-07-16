"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Attar Oil - Oud",
    price: 1200,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
  },
  {
    id: "2",
    name: "Luxury Attar Musk",
    price: 900,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
  },
];

const CartPage = () => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = 0; // Add your discount logic if needed
  const total = subtotal - discount;

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex items-center gap-4 p-4">
              <div className="w-24 h-24 relative rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-semibold">
                    ৳{item.price}
                  </span>
                  <Badge variant="outline">Qty: {item.quantity}</Badge>
                </div>
              </div>
              <Button size="icon" variant="ghost">
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
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-৳{discount}</span>
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
