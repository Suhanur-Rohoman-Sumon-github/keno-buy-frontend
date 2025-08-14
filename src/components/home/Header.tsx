/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useGetCart } from "@/hooks/cart.hook";
import { useGetCategoryQuery } from "@/hooks/category.hook";
import { RxAvatar } from "react-icons/rx";
import { useUser } from "@/context/useProvider";
import { logout } from "@/services/authServices";

const Header = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const { data: categories } = useGetCategoryQuery();
  const { user } = useUser();

  // Local cart count
  const [localCartCount, setLocalCartCount] = useState(0);

  const handleLogout = () => {
    logout();
  };

  const calculateLocalCartCount = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const count = cartItems.reduce(
        (sum: number, item: any) => sum + (item.quantity || 0),
        0
      );
      setLocalCartCount(count);
    } catch {
      setLocalCartCount(0);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
      calculateLocalCartCount();
      setHydrated(true);
    }
  }, []);

  const { data: cartData, refetch } = useGetCart(userEmail || "");

  useEffect(() => {
    if (userEmail) {
      refetch();
    }
  }, [userEmail, refetch]);

  useEffect(() => {
    const handleCartUpdate = () => {
      calculateLocalCartCount();
      refetch();
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [refetch]);

  const backendCount =
    cartData?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    ) || 0;

  const cartCount = hydrated ? localCartCount || backendCount : 0;

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b shadow-card sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 md:px-0 py-4 md:w-11/12">
          <div className="flex items-center justify-between">
            {/* Logo & Menu */}
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
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

            {/* Right Actions */}
            <div className="flex items-center relative">
              {/* Avatar */}
              <div className="relative">
                <button
                  onClick={() => setIsAvatarMenuOpen((prev) => !prev)}
                  className="mt-1"
                >
                  <RxAvatar className="h-5 w-5" />
                </button>

                {hydrated &&
                  (user
                    ? isAvatarMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                          <button
                            onClick={() => {
                              handleLogout();
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      )
                    : isAvatarMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                          <button
                            onClick={() => {
                              setIsAvatarMenuOpen(false);
                              router.push("/login");
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Login
                          </button>
                          <button
                            onClick={() => {
                              setIsAvatarMenuOpen(false);
                              router.push("/signup");
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Register
                          </button>
                        </div>
                      ))}
              </div>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {hydrated && cartCount > 0 && (
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
          {categories?.map((category: any, idx: number) => (
            <li key={idx}>
              <Link
                href={`/category/${category._id
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
