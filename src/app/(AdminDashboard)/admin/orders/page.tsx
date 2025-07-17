"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
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
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { name: "Premium Cotton T-Shirt", quantity: 2, price: 29.99 },
      { name: "Wireless Headphones", quantity: 1, price: 99.99 },
    ],
    total: 159.97,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [{ name: "Leather Wallet", quantity: 1, price: 49.99 }],
    total: 49.99,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-17T11:45:00Z",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    items: [
      { name: "Smartphone Case", quantity: 3, price: 19.99 },
      { name: "Coffee Mug", quantity: 2, price: 14.99 },
    ],
    total: 89.95,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    createdAt: "2024-01-17T16:20:00Z",
    updatedAt: "2024-01-17T16:20:00Z",
  },
  {
    id: "ORD-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    items: [{ name: "Premium Cotton T-Shirt", quantity: 1, price: 29.99 }],
    total: 29.99,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: "321 Elm St, Miami, FL 33101",
    createdAt: "2024-01-18T08:45:00Z",
    updatedAt: "2024-01-18T08:45:00Z",
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david@example.com",
    items: [{ name: "Wireless Headphones", quantity: 1, price: 99.99 }],
    total: 99.99,
    status: "cancelled",
    paymentStatus: "failed",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
    createdAt: "2024-01-18T12:30:00Z",
    updatedAt: "2024-01-18T13:15:00Z",
  },
];

const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

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

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const OrderDetailsDialog = ({ order }: { order: Order }) => (
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
              Name: {order.customerName}
            </p>
            <p className="text-sm text-muted-foreground">
              Email: {order.customerEmail}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Order Status</h4>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-1">{order.status}</span>
              </Badge>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus}
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
              {order.items.map((item, index) => (
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
                Total: ${order.total.toFixed(2)}
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
          <Select
            value={order.status}
            onValueChange={(value: Order["status"]) =>
              updateOrderStatus(order.id, value)
            }
          >
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

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;

  return (
    <div className="space-y-6">
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
            <div className="text-2xl font-bold">{orders.length}</div>
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
            <div className="text-2xl font-bold">{pendingOrders}</div>
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
            <div className="text-2xl font-bold">{shippedOrders}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
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
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items.length} item(s)</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
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

export default OrdersManagement;
