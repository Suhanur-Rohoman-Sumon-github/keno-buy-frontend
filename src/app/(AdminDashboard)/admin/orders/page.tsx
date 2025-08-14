/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Eye,
  Package2,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/hooks/order.hook";
import Image from "next/image";

interface CourierStats {
  name: string;
  logo: string;
  total_parcel: number;
  success_parcel: number;
  cancelled_parcel: number;
  success_ratio: number;
}

interface FraudData {
  _id: string;
  phone: string;
  status: "success" | "failed" | "pending";
  details: {
    status: string;
    courierData: Record<string, CourierStats> & {
      summary: {
        name: string;
        logo: string;
        total_parcel: number;
        success_parcel: number;
        cancelled_parcel: number;
        success_ratio: number;
      };
    };
    reports: any[];
  };
}

interface Order {
  products: any;
  id: string;
  firstName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  fraudData?: FraudData;
}

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // combine all filters into one string to send as 'searchTerm'
  const combinedSearchTerm = [
    debouncedSearch,
    statusFilter !== "all" ? statusFilter : "",
    paymentFilter !== "all" ? paymentFilter : "",
  ]
    .filter(Boolean)
    .join(" ");

  const queryParams = combinedSearchTerm
    ? { searchTerm: combinedSearchTerm }
    : {};

  const { data, isLoading } = useGetAllOrderQuery(queryParams);

  if (isLoading) {
    return <div>loading...</div>;
  }

  const ordersArray = Array.isArray(data?.data) ? data?.data : [];

  const mappedOrders = ordersArray?.map((o: any) => {
    return {
      id: o._id,
      firstName: o.firstName,
      products: o.products.map((p: any) => ({
        name: p.product?.Title || "Unknown",
        quantity: p.quantity,
        price: p.product?.discountedPrice || 0,
      })),
      total: o.products.reduce(
        (sum: number, p: any) =>
          sum + (p.product?.discountedPrice || 0) * p.quantity,
        0
      ),
      status: o.status,
      paymentStatus: o.paymentMethod === "cod" ? "pending" : "paid",
      shippingAddress: `${o.address}, ${o.district}`,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      fraudData: o.fraudData,
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package2 className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const OrderDetailsDialog = ({ order }: { order: Order }) => {
    const updateOrderMutation = useUpdateOrderStatusMutation();

    const handleStatusChange = (value: Order["status"]) => {
      updateOrderMutation.mutate({
        orderId: order.id,
        status: value,
      });
    };

    return (
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
          <DialogDescription>
            Complete information about this order
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Customer Information</h4>
              <p className="text-sm text-muted-foreground">
                Name: {order.firstName}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Order Status</h4>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                </Badge>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Order Items</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.products?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ${(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Total: ${order?.total?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Created:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Last Updated:</strong>{" "}
              {new Date(order.updatedAt).toLocaleString()}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Update Status</h4>
            <Select value={order.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    );
  };

  const FraudDetectionDialog = ({ order }: { order: Order }) => {
    if (!order.fraudData) {
      return (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fraud Detection - Order {order.id}</DialogTitle>
          </DialogHeader>
          <p>No fraud data available for this order.</p>
        </DialogContent>
      );
    }

    const fraud = order.fraudData;

    const statusColorClass = (status: string) => {
      switch (status) {
        case "success":
          return "bg-green-100 text-green-800";
        case "failed":
          return "bg-red-100 text-red-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Fraud Detection - Order {order.id}</DialogTitle>
          <DialogDescription>
            Review possible fraudulent activity for this order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary section in flex */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Left side: Stats cards */}
            <div className="flex flex-col gap-2 w-full sm:w-1/3">
              <div className="bg-purple-500 text-white px-4 py-2 rounded font-semibold">
                মোট পার্সেল: {fraud.details.courierData.summary.total_parcel}
              </div>
              <div className="bg-cyan-500 text-white px-4 py-2 rounded font-semibold">
                সফল পার্সেল: {fraud.details.courierData.summary.success_parcel}
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded font-semibold">
                বাতিল পার্সেল:{" "}
                {fraud.details.courierData.summary.cancelled_parcel}
              </div>
            </div>

            {/* Right side: Pie Chart */}
            <div className="flex-1 flex items-center justify-center">
              {/* Replace with your chart component */}
              <PieChart width={200} height={200}>
                <Pie
                  data={[
                    {
                      name: "সফল",
                      value: fraud.details.courierData.summary.success_parcel,
                    },
                    {
                      name: "বাতিল",
                      value: fraud.details.courierData.summary.cancelled_parcel,
                    },
                  ]}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  <Cell fill="#22c55e" /> {/* Green */}
                  <Cell fill="#ef4444" /> {/* Red */}
                </Pie>
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Courier Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>কুরিয়ার</TableHead>
                <TableHead>মোট</TableHead>
                <TableHead>সফল</TableHead>
                <TableHead>বাতিল</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(fraud.details.courierData)
                .filter(([key]) => key !== "summary")
                .map(([key, courier]) => (
                  <TableRow key={key}>
                    <TableCell className="flex items-center gap-2">
                      <Image
                        height={200}
                        width={500}
                        src={courier.logo}
                        alt={courier.name}
                        className="h-10 w-10"
                      />
                      {courier.name}
                    </TableCell>
                    <TableCell>{courier.total_parcel}</TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {courier.success_parcel}
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      {courier.cancelled_parcel}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground">
          Track and manage customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mappedOrders.length}</div>
            <p className="text-xs text-muted-foreground">+3 new today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{pendingOrders}</div> */}
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Shipped Orders
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{shippedOrders}</div> */}
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div> */}
            <p className="text-xs text-muted-foreground">From paid orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Order Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({ordersArray?.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Outer container with horizontal scroll */}
          <div className="w-full overflow-x-auto">
            {/* Inner container ensures min width for table */}
            <div className="min-w-[900px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappedOrders?.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.firstName}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order?.products?.length} item(s)</TableCell>
                      <TableCell>${order?.total?.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <OrderDetailsDialog order={order} />
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Detect Fraud"
                              className="text-red-600 hover:bg-red-100"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <FraudDetectionDialog order={order} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;
