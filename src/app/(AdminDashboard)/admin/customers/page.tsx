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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "blocked";
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  joinDate: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    smsMarketing: boolean;
  };
}

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    totalOrders: 12,
    totalSpent: 1249.99,
    lastOrderDate: "2024-01-18T10:30:00Z",
    joinDate: "2023-06-15T09:00:00Z",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    preferences: {
      newsletter: true,
      smsMarketing: false,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    totalOrders: 8,
    totalSpent: 687.45,
    lastOrderDate: "2024-01-16T14:20:00Z",
    joinDate: "2023-08-22T11:30:00Z",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    preferences: {
      newsletter: true,
      smsMarketing: true,
    },
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "active",
    totalOrders: 3,
    totalSpent: 156.78,
    lastOrderDate: "2024-01-10T16:45:00Z",
    joinDate: "2023-12-01T14:00:00Z",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    preferences: {
      newsletter: false,
      smsMarketing: false,
    },
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    totalOrders: 1,
    totalSpent: 29.99,
    lastOrderDate: "2023-11-05T12:15:00Z",
    joinDate: "2023-10-10T10:20:00Z",
    address: {
      street: "321 Elm St",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA",
    },
    preferences: {
      newsletter: true,
      smsMarketing: false,
    },
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    status: "blocked",
    totalOrders: 0,
    totalSpent: 0,
    joinDate: "2024-01-05T08:30:00Z",
    address: {
      street: "654 Maple Dr",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
    },
    preferences: {
      newsletter: false,
      smsMarketing: false,
    },
  },
];

const CustomersManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "inactive":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "blocked":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000)
      return {
        tier: "Premium",
        color: "bg-purple-500/10 text-purple-700 border-purple-200",
      };
    if (totalSpent >= 500)
      return {
        tier: "Gold",
        color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
      };
    if (totalSpent >= 100)
      return {
        tier: "Silver",
        color: "bg-gray-500/10 text-gray-700 border-gray-200",
      };
    return {
      tier: "Bronze",
      color: "bg-orange-500/10 text-orange-700 border-orange-200",
    };
  };

  const updateCustomerStatus = (
    customerId: string,
    newStatus: Customer["status"]
  ) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    );
  };

  const CustomerDetailsDialog = ({ customer }: { customer: Customer }) => {
    const tier = getCustomerTier(customer.totalSpent);

    return (
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customer Details - {customer.name}</DialogTitle>
          <DialogDescription>
            Complete information about this customer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              <p className="text-muted-foreground">{customer.email}</p>
              {customer.phone && (
                <p className="text-muted-foreground">{customer.phone}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
                <Badge className={tier.color}>{tier.tier}</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Order Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Orders:</span>
                  <span className="font-medium">{customer.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Spent:</span>
                  <span className="font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Order:</span>
                  <span className="font-medium">
                    $
                    {customer.totalOrders > 0
                      ? (customer.totalSpent / customer.totalOrders).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Order:</span>
                  <span className="font-medium">
                    {customer.lastOrderDate
                      ? new Date(customer.lastOrderDate).toLocaleDateString()
                      : "Never"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Account Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Join Date:</span>
                  <span className="font-medium">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Newsletter:</span>
                  <span className="font-medium">
                    {customer.preferences?.newsletter
                      ? "Subscribed"
                      : "Not Subscribed"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SMS Marketing:</span>
                  <span className="font-medium">
                    {customer.preferences?.smsMarketing
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {customer.address && (
            <div>
              <h4 className="font-semibold mb-3">Shipping Address</h4>
              <div className="text-sm text-muted-foreground">
                <p>{customer.address.street}</p>
                <p>
                  {customer.address.city}, {customer.address.state}{" "}
                  {customer.address.zipCode}
                </p>
                <p>{customer.address.country}</p>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3">Update Status</h4>
            <Select
              value={customer.status}
              onValueChange={(value: Customer["status"]) =>
                updateCustomerStatus(customer.id, value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    );
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );
  const averageOrderValue =
    totalRevenue /
      customers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">
          Manage your customer base and relationships
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeCustomers / totalCustomers) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total lifetime value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Order Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Customer Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const tier = getCustomerTier(customer.totalSpent);
                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={tier.color}>{tier.tier}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <CustomerDetailsDialog customer={customer} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersManagement;
