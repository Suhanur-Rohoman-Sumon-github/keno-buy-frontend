/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  Eye,
  BarChart3,
} from "lucide-react";
import { useGetAdminDataQuery } from "@/hooks/auth.hook";
import Link from "next/link";

const AdminDashboard = () => {
  const { data: adminData, isLoading } = useGetAdminDataQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const summary = adminData?.summary || {};
  const recentOrders = adminData?.recentOrders || [];
  const lowStockProducts = adminData?.lowStockProducts || [];

  console.log("Admin Data:", adminData);

  // Sample data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: `${summary?.totalRevenue || "0"} USD`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Total Orders",
      value: `${summary?.totalOrders || "0"}`,
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-info",
    },
    {
      title: "Total Products",
      value: `${summary?.totalProducts || "0"}`,
      change: "+2.1%",
      trend: "up",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Active Customers",
      value: `${summary?.activeCustomers || "0"}`,
      change: "-1.5%",
      trend: "down",
      icon: Users,
      color: "text-warning",
    },
  ];

  const getStockStatusColor = (current: number, min: number) => {
    const ratio = current / min;
    if (ratio <= 0.3) return "bg-destructive text-destructive-foreground";
    if (ratio <= 0.6) return "bg-warning text-warning-foreground";
    return "bg-success text-success-foreground";
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "Processing":
        return "bg-info text-info-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Heres whats happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card className="border-warning/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Low Stock Alert
              </CardTitle>
              <Badge variant="destructive" className="animate-pulse">
                {lowStockProducts.length} Items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts.map((product: any) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-destructive/20"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {product.Title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Stock: {product.Stock}
                    </div>
                  </div>
                  <Badge
                    className={getStockStatusColor(
                      product.currentStock,
                      product.minStock
                    )}
                  >
                    {product.currentStock <= product.minStock * 0.3
                      ? "Critical"
                      : product.currentStock <= product.minStock * 0.6
                      ? "Low"
                      : "Normal"}
                  </Badge>
                </div>
              </div>
            ))}
            <Link href="/admin/products">
              <Button className="w-full" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Manage Inventory
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-foreground">{order.id}</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.firstName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.createdAt}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-foreground">
                      $
                      {order.products.reduce(
                        (sum: number, item: any) =>
                          sum + item.quantity * item?.product?.discountedPrice,
                        0
                      )}
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
