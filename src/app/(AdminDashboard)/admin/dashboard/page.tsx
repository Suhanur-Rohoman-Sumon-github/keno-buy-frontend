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

const AdminDashboard = () => {
  // Sample data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "৳2,45,350",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Total Orders",
      value: "1,847",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-info",
    },
    {
      title: "Total Products",
      value: "324",
      change: "+2.1%",
      trend: "up",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Active Customers",
      value: "892",
      change: "-1.5%",
      trend: "down",
      icon: Users,
      color: "text-warning",
    },
  ];

  const lowStockProducts = [
    {
      id: 1,
      name: "Premium Attar Collection",
      currentStock: 3,
      minStock: 10,
      category: "Attar",
    },
    {
      id: 2,
      name: "Cotton Panjabi - White",
      currentStock: 2,
      minStock: 15,
      category: "Panjabi",
    },
    {
      id: 3,
      name: "Prayer Cap - Black",
      currentStock: 1,
      minStock: 20,
      category: "Tupi",
    },
    {
      id: 4,
      name: "Organic Honey 500g",
      currentStock: 5,
      minStock: 12,
      category: "Natural Foods",
    },
    {
      id: 5,
      name: "Sports Sneakers - Blue",
      currentStock: 4,
      minStock: 8,
      category: "Sneakers",
    },
  ];

  const recentOrders = [
    {
      id: "#BS001",
      customer: "Ahmed Rahman",
      amount: "৳1,250",
      status: "Completed",
      time: "2 hours ago",
    },
    {
      id: "#BS002",
      customer: "Fatima Khan",
      amount: "৳850",
      status: "Processing",
      time: "4 hours ago",
    },
    {
      id: "#BS003",
      customer: "Mohammad Ali",
      amount: "৳2,100",
      status: "Pending",
      time: "6 hours ago",
    },
    {
      id: "#BS004",
      customer: "Ayesha Begum",
      amount: "৳650",
      status: "Completed",
      time: "8 hours ago",
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
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-destructive/20"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Stock: {product.currentStock}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Min: {product.minStock}
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
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Manage Inventory
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-foreground">{order.id}</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-foreground">
                      {order.amount}
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col gap-2" variant="outline">
              <Package className="h-6 w-6" />
              Add Product
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <ShoppingCart className="h-6 w-6" />
              View Orders
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              Customers
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
