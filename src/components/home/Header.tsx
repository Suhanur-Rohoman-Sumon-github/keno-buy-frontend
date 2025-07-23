/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useGetCart } from "@/hooks/cart.hook";

const Header = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [userEmail, setUserEmail] = useState<string | null>(null);

  // 1. On mount, get the email from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
    }
  }, []);

  console.log("User Email:", userEmail);

  // 2. Fetch cart with react-query hook once we have the userEmail
  const { data: cartData, isLoading } = useGetCart(userEmail || "");

  if (isLoading) {
    return <div className="text-center p-4"></div>;
  }

  console.log(cartData);

  // 3. Calculate cart count from backend data (fallback to 0)
  const cartCount =
    cartData?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    ) || 0;

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
  };

  // useEffect(() => {
  //   updateCartCount();

  //   // Listen for custom "cartUpdated" events
  //   const handleCartUpdate = () => updateCartCount();
  //   window.addEventListener("cartUpdated", handleCartUpdate);

  //   return () => {
  //     window.removeEventListener("cartUpdated", handleCartUpdate);
  //   };
  // }, []);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 py-4 md:w-11/12">
          <div className="flex items-center justify-between">
            {/* Logo & Menu */}
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className=""
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

            {/* Search Bar (Desktop) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-8"
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleSearch}
                  type="button"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

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

        {/* Search Bar (Mobile) */}
        {isSearchOpen && (
          <div className="md:hidden bg-background p-4 border-t">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Left Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Categories</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ul className="p-4 space-y-2">
          {categories.map((category, idx) => (
            <li key={idx}>
              <Link
                href={`/category/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                onClick={() => setIsMenuOpen(false)} // Close sidebar after click
                className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
