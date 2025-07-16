"use client";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

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

  return (
    <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full ">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p>Free shipping on orders over ৳500 | Call: +880-1234-567890</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 md:w-11/12 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              KenoBuy
            </Link>
          </div>

          {/* Search Bar - Desktop */}
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
          <div className="flex items-center space-x-4">
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
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
      </div>

      {/* Navigation */}
      <nav
        className={`border-t bg-background ${
          isMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start md:justify-center py-3 md:py-2 text-left"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
