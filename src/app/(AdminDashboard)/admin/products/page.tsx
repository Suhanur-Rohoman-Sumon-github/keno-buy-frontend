/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
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
  Plus,
  Edit2,
  Trash2,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";
import { useGetAllProductsQuery } from "@/hooks/product.hook";
import ProductCreateForm from "@/components/admin/ProductCreateForm";
import UpdateProductForm from "@/components/admin/UpdateProductForm";
import { useGetCategoryQuery } from "@/hooks/category.hook";

interface Product {
  _id: string;
  Title: string;
  category: string;
  originalPrice: number;
  stock: number;
  status: "active" | "inactive" | "draft";
  sales: number;
  image?: string;
}

const ProductsManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const { data: categories } = useGetCategoryQuery();

  console.log("Categories:", categories);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const queryParams = {
    category: selectedCategory === "all" ? undefined : selectedCategory,
    searchTerm,
  };

  const { data: initialProducts, isLoading } = useGetAllProductsQuery(
    queryParams,
    { keepPreviousData: true }
  );

  const filteredProducts = initialProducts || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const categories = [
  //   "all",
  //   ...Array.from(new Set(filteredProducts.map((p: any) => p.category))),
  // ];

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "inactive":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "draft":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", label: "Out of Stock" };
    if (stock < 20) return { color: "text-yellow-600", label: "Low Stock" };
    return { color: "text-green-600", label: "In Stock" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <ProductCreateForm onClose={() => setIsAddProductOpen(false)} />
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                filteredProducts.filter((p: any) => p.status === "active")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredProducts.filter((p: any) => p.stock < 20).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredProducts.filter((p: any) => p.stock === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Product Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category: any) => (
                  <SelectItem key={category._id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: Product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.Title}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product?.originalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={stockStatus.color}>
                        {product.stock} ({stockStatus.label})
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.sales} sold</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingProduct(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Product Modal */}
      <Dialog
        open={!!viewingProduct}
        onOpenChange={() => setViewingProduct(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingProduct?.Title}</DialogTitle>
          </DialogHeader>
          {viewingProduct && (
            <div className="space-y-2">
              <p>
                <strong>Category:</strong> {viewingProduct.category}
              </p>
              <p>
                <strong>Price:</strong> $
                {viewingProduct.originalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong> {viewingProduct.stock}
              </p>
              <p>
                <strong>Status:</strong> {viewingProduct.status}
              </p>
              <p>
                <strong>Sales:</strong> {viewingProduct.sales}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
      >
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {/* {editingProduct && (
              <UpdateProductForm
                productId={editingProduct._id}
                onClose={() => setEditingProduct(null)}
              />
            )} */}
          </DialogContent>
        </Dialog>
      </Dialog>
    </div>
  );
};

export default ProductsManagement;
