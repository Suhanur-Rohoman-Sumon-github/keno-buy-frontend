"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/useProvider";

interface AdminShellProps {
  children: React.ReactNode;
}

const AdminShell = ({ children }: AdminShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser() || {};
  if (!user) {
    // While user is loading, show a loading spinner or empty sidebar
    return;
  }

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      label: "Products",
      href: "/admin/products",
      icon: Package,
      badge: "2",
    },
    {
      id: "orders",
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      badge: "8",
    },
    {
      id: "customers",
      label: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  // Normalize role & paths
  const normalizeRole = (role?: string) =>
    role?.toLowerCase().replace(/\s+/g, "").trim();

  const normalizePath = (path: string) =>
    path.replace(/\/+$/, "").toLowerCase();

  const role = normalizeRole(user?.role);
  const allowedForSubAdmin = ["/admin/products", "/admin/orders"].map(
    normalizePath
  );

  const filteredSidebarItems =
    role === "subadmin"
      ? sidebarItems.filter((item) => {
          const match = allowedForSubAdmin.includes(normalizePath(item.href));

          return match;
        })
      : sidebarItems;

  return (
    <div className="flex pt-[57px]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <Link
              href="/admin/dashboard"
              className="text-xl font-bold text-primary"
            >
              Admin Panel
            </Link>
            <Badge variant="secondary" className="hidden sm:flex">
              kenobuy Admin
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                  3
                </Badge>
              </Button>
            </Link>
            <Link href="/logout">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2  md:mt-0 mt-12">
            {filteredSidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start ">
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-auto" variant="secondary">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* OVERLAY for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-0 p-4 bg-background min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminShell;
