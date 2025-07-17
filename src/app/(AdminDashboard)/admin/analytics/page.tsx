"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Target,
  Eye,
  MousePointer,
} from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 4500, orders: 89, customers: 23 },
    { month: "Feb", revenue: 5200, orders: 102, customers: 31 },
    { month: "Mar", revenue: 4800, orders: 95, customers: 28 },
    { month: "Apr", revenue: 6100, orders: 118, customers: 42 },
    { month: "May", revenue: 7200, orders: 134, customers: 48 },
    { month: "Jun", revenue: 6800, orders: 128, customers: 45 },
    { month: "Jul", revenue: 8100, orders: 156, customers: 57 },
    { month: "Aug", revenue: 7900, orders: 149, customers: 53 },
    { month: "Sep", revenue: 8500, orders: 162, customers: 61 },
    { month: "Oct", revenue: 9200, orders: 178, customers: 67 },
    { month: "Nov", revenue: 9800, orders: 189, customers: 72 },
    { month: "Dec", revenue: 10500, orders: 201, customers: 78 },
  ];

  const categoryData = [
    { name: "Clothing", value: 45, color: "#8884d8" },
    { name: "Electronics", value: 30, color: "#82ca9d" },
    { name: "Accessories", value: 15, color: "#ffc658" },
    { name: "Home", value: 10, color: "#ff7300" },
  ];

  const topProducts = [
    {
      name: "Premium Cotton T-Shirt",
      sales: 234,
      revenue: 7019.66,
      growth: 15.2,
    },
    { name: "Wireless Headphones", sales: 189, revenue: 18889.11, growth: 8.7 },
    { name: "Smartphone Case", sales: 445, revenue: 8895.55, growth: 23.1 },
    { name: "Leather Wallet", sales: 156, revenue: 7798.44, growth: -5.3 },
    { name: "Coffee Mug", sales: 123, revenue: 1843.77, growth: 12.4 },
  ];

  const trafficSources = [
    { source: "Direct", visits: 3420, percentage: 34.2, color: "bg-blue-500" },
    {
      source: "Organic Search",
      visits: 2890,
      percentage: 28.9,
      color: "bg-green-500",
    },
    {
      source: "Social Media",
      visits: 1560,
      percentage: 15.6,
      color: "bg-purple-500",
    },
    {
      source: "Email Marketing",
      visits: 1240,
      percentage: 12.4,
      color: "bg-orange-500",
    },
    { source: "Paid Ads", visits: 890, percentage: 8.9, color: "bg-red-500" },
  ];

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$94,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Total Orders",
      value: "1,654",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "New Customers",
      value: "428",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.4%",
      trend: "down",
      icon: Target,
      description: "vs last month",
    },
    {
      title: "Avg Order Value",
      value: "$57.12",
      change: "+4.1%",
      trend: "up",
      icon: Package,
      description: "vs last month",
    },
    {
      title: "Page Views",
      value: "24,680",
      change: "+7.8%",
      trend: "up",
      icon: Eye,
      description: "vs last month",
    },
  ];

  // Chart data visualization would go here
  // For now, showing data in a simplified format

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track your business performance and insights
          </p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-sm">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span
                  className={
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {kpi.change}
                </span>
                <span className="text-muted-foreground ml-1">
                  {kpi.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Orders Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$94,500</div>
                <p className="text-muted-foreground">Total Revenue This Year</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-semibold">$10,500</div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div>
                  <div className="text-xl font-semibold">201</div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                </div>
                <div>
                  <div className="text-xl font-semibold">78</div>
                  <p className="text-sm text-muted-foreground">New Customers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{category.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${source.color}`} />
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {source.visits.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {source.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>
            Best selling products and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${product.revenue.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={
                          product.growth > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
