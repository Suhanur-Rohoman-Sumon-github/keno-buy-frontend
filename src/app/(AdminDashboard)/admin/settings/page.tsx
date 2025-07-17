/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  Mail,
  Bell,
  Shield,
  Palette,
  Database,
  CreditCard,
  Users,
  Package,
  Truck,
  Settings as SettingsIcon,
  Save,
  Upload,
  Download,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    store: {
      name: "My E-commerce Store",
      description: "Premium products for modern lifestyle",
      email: "contact@mystore.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, State 12345",
      currency: "USD",
      timezone: "America/New_York",
      language: "en",
    },
    notifications: {
      emailOrders: true,
      emailCustomers: true,
      emailLowStock: true,
      pushOrders: false,
      pushCustomers: false,
      smsOrders: false,
    },
    shipping: {
      freeShippingThreshold: 50,
      standardRate: 5.99,
      expressRate: 12.99,
      internationalRate: 24.99,
      handlingFee: 2.5,
      estimatedDays: "3-5",
    },
    payments: {
      enablePaypal: true,
      enableStripe: true,
      enableApplePay: false,
      enableGooglePay: false,
      testMode: true,
    },
    tax: {
      enableTax: true,
      taxRate: 8.5,
      taxInclusive: false,
      euVatEnabled: false,
    },
    inventory: {
      lowStockThreshold: 10,
      allowBackorders: false,
      trackInventory: true,
      autoDeduct: true,
    },
  });

  const handleSave = (section: string) => {
    // Logic to save settings, e.g., API call

    alert(`Settings for ${section} saved successfully!`);
  };

  const updateSetting = (
    section: keyof typeof settings,
    key: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.store.name}
                    onChange={(e) =>
                      updateSetting("store", "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Contact Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.store.email}
                    onChange={(e) =>
                      updateSetting("store", "email", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.store.description}
                  onChange={(e) =>
                    updateSetting("store", "description", e.target.value)
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={settings.store.phone}
                    onChange={(e) =>
                      updateSetting("store", "phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.store.currency}
                    onValueChange={(value) =>
                      updateSetting("store", "currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  value={settings.store.address}
                  onChange={(e) =>
                    updateSetting("store", "address", e.target.value)
                  }
                />
              </div>
              <Button onClick={() => handleSave("General")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when to send email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailOrders">New Orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new orders
                  </p>
                </div>
                <Switch
                  id="emailOrders"
                  checked={settings.notifications.emailOrders}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "emailOrders", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailCustomers">New Customers</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new customer registrations
                  </p>
                </div>
                <Switch
                  id="emailCustomers"
                  checked={settings.notifications.emailCustomers}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "emailCustomers", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailLowStock">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications when products are low in stock
                  </p>
                </div>
                <Switch
                  id="emailLowStock"
                  checked={settings.notifications.emailLowStock}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "emailLowStock", checked)
                  }
                />
              </div>
              <Button onClick={() => handleSave("Notification")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push & SMS Notifications</CardTitle>
              <CardDescription>
                Configure push and SMS notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushOrders">
                    Push Notifications for Orders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send push notifications for new orders
                  </p>
                </div>
                <Switch
                  id="pushOrders"
                  checked={settings.notifications.pushOrders}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "pushOrders", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsOrders">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send SMS notifications for important events
                  </p>
                </div>
                <Switch
                  id="smsOrders"
                  checked={settings.notifications.smsOrders}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "smsOrders", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Configuration</CardTitle>
              <CardDescription>
                Set up your shipping rates and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShipping">
                    Free Shipping Threshold ($)
                  </Label>
                  <Input
                    id="freeShipping"
                    type="number"
                    value={settings.shipping.freeShippingThreshold}
                    onChange={(e) =>
                      updateSetting(
                        "shipping",
                        "freeShippingThreshold",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standardRate">
                    Standard Shipping Rate ($)
                  </Label>
                  <Input
                    id="standardRate"
                    type="number"
                    step="0.01"
                    value={settings.shipping.standardRate}
                    onChange={(e) =>
                      updateSetting(
                        "shipping",
                        "standardRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expressRate">Express Shipping Rate ($)</Label>
                  <Input
                    id="expressRate"
                    type="number"
                    step="0.01"
                    value={settings.shipping.expressRate}
                    onChange={(e) =>
                      updateSetting(
                        "shipping",
                        "expressRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internationalRate">
                    International Shipping Rate ($)
                  </Label>
                  <Input
                    id="internationalRate"
                    type="number"
                    step="0.01"
                    value={settings.shipping.internationalRate}
                    onChange={(e) =>
                      updateSetting(
                        "shipping",
                        "internationalRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="handlingFee">Handling Fee ($)</Label>
                  <Input
                    id="handlingFee"
                    type="number"
                    step="0.01"
                    value={settings.shipping.handlingFee}
                    onChange={(e) =>
                      updateSetting(
                        "shipping",
                        "handlingFee",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDays">Estimated Delivery Days</Label>
                  <Input
                    id="estimatedDays"
                    value={settings.shipping.estimatedDays}
                    onChange={(e) =>
                      updateSetting("shipping", "estimatedDays", e.target.value)
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Shipping")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure accepted payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paypal">PayPal</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via PayPal
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      settings.payments.enablePaypal ? "default" : "secondary"
                    }
                  >
                    {settings.payments.enablePaypal ? "Enabled" : "Disabled"}
                  </Badge>
                  <Switch
                    id="paypal"
                    checked={settings.payments.enablePaypal}
                    onCheckedChange={(checked) =>
                      updateSetting("payments", "enablePaypal", checked)
                    }
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stripe">Stripe</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept credit card payments via Stripe
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      settings.payments.enableStripe ? "default" : "secondary"
                    }
                  >
                    {settings.payments.enableStripe ? "Enabled" : "Disabled"}
                  </Badge>
                  <Switch
                    id="stripe"
                    checked={settings.payments.enableStripe}
                    onCheckedChange={(checked) =>
                      updateSetting("payments", "enableStripe", checked)
                    }
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="testMode">Test Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Process payments in test mode
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      settings.payments.testMode ? "destructive" : "default"
                    }
                  >
                    {settings.payments.testMode ? "Test" : "Live"}
                  </Badge>
                  <Switch
                    id="testMode"
                    checked={settings.payments.testMode}
                    onCheckedChange={(checked) =>
                      updateSetting("payments", "testMode", checked)
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Payment")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Configure inventory tracking and stock management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={settings.inventory.lowStockThreshold}
                  onChange={(e) =>
                    updateSetting(
                      "inventory",
                      "lowStockThreshold",
                      parseInt(e.target.value)
                    )
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Receive alerts when product stock falls below this number
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trackInventory">Track Inventory</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable inventory tracking across all products
                  </p>
                </div>
                <Switch
                  id="trackInventory"
                  checked={settings.inventory.trackInventory}
                  onCheckedChange={(checked) =>
                    updateSetting("inventory", "trackInventory", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowBackorders">Allow Backorders</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to order out-of-stock items
                  </p>
                </div>
                <Switch
                  id="allowBackorders"
                  checked={settings.inventory.allowBackorders}
                  onCheckedChange={(checked) =>
                    updateSetting("inventory", "allowBackorders", checked)
                  }
                />
              </div>
              <Button onClick={() => handleSave("Inventory")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage admin users and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  User management features are coming soon. This will include
                  role-based access control and admin user management.
                </p>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Invite Admin User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Import, export, and backup your store data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Import Data
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Database className="h-6 w-6 mb-2" />
                  Backup Store
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Advanced security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Security</h3>
                <p className="text-muted-foreground">
                  Advanced security features including 2FA, audit logs, and
                  security monitoring are coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
