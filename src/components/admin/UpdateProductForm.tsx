"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { useUpdateProductMutation } from "@/hooks/product.hook";

type ProductStatus = "active" | "inactive" | "draft";

interface UpdateProductFormProps {
  onClose: () => void;
  product: {
    _id: string;
    Title: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
  };
}

interface ProductFormValues {
  Title: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

const UpdateProductForm = ({ onClose, product }: UpdateProductFormProps) => {
  const { register, handleSubmit, reset } = useForm<ProductFormValues>();
  const { mutate: updateProduct } = useUpdateProductMutation();

  

  // Prefill form with product values
  useEffect(() => {
    reset({
      Title: product?.Title,
      category: product?.category,
      price: product?.price,
      stock: product?.stock,
      status: product?.status,
    });
  }, [product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      updateProduct({ productId: product._id, payload: data as unknown as Record<string, unknown> });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input {...register("Title", { required: true })} />
      </div>
      <div>
        <Label>Category</Label>
        <Input {...register("category", { required: true })} />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          step="0.01"
          {...register("price", { required: true })}
        />
      </div>
      <div>
        <Label>Stock</Label>
        <Input type="number" {...register("stock", { required: true })} />
      </div>
      <div>
        <Label>Status</Label>
        <select
          {...register("status", { required: true })}
          className="w-full border rounded-md p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <DialogFooter>
        <Button type="submit">Update Product</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateProductForm;
