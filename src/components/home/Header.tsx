"use client";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "Attar",
    "Panjabi",
    "T-Shirt",
    "Polo",
    "Pants & Trouser",
    "Sneakers",
    "Tupi",
    "Natural Foods",
    "Combo Offers",
  ];

  const updateCartCount = () => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        const cartArray = JSON.parse(storedCart);
        setCartCount(Array.isArray(cartArray) ? cartArray.length : 0);
      } catch {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();

    // Listen for custom "cartUpdated" events
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <>
      <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 py-4 md:w-11/12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="text-2xl font-bold text-primary">
                <Image
                  height={50}
                  width={50}
                  alt="logo"
                  src="https://i.ibb.co/Xr95bbkT/Ecommerce-Logo-Keno-Buy-in-Teal-and-Gray-removebg-preview.png"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
