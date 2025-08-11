"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { FieldValues } from "react-hook-form";
import { Category } from "@/types";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DInput from "../form/DInput";
import DForm from "../form/DForm";
import DSelect from "../form/DSelect";
import DTextArea from "../form/DTextArea";
import { useCreateProductMutation } from "@/hooks/product.hook";
import { useGetCategoryQuery } from "@/hooks/category.hook";

interface ProductCreateFormProps {
  onClose: () => void;
}

const ProductCreateForm = ({ onClose }: ProductCreateFormProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { mutate: handleCreateProduct, isPending } = useCreateProductMutation();
  const { data: categories } = useGetCategoryQuery();

  const categoriesOptions =
    categories?.map((category: Category) => ({
      key: category.name,
      label: category.name,
    })) || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: FieldValues): void => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

    handleCreateProduct(formData);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create Product</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new product.
        </DialogDescription>
      </DialogHeader>

      {/* Image Upload */}
      <div className="mb-6 text-center">
        <label
          htmlFor="image-upload"
          className="inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-lg shadow-md focus:ring-2 cursor-pointer"
        >
          <AiOutlineUpload className="mr-2 text-lg" />
          Upload Images
        </label>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {imagePreview.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {imagePreview.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  alt={`Preview ${index + 1}`}
                  className="border-2 border-dashed h-32 rounded"
                  height={100}
                  src={image}
                  width={100}
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <DForm onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DInput label="Product Name" name="Title" type="text" />
          <DInput label="buyPrice" name="buyPrice" type="number" />
          <DInput label="Price" name="originalPrice" type="number" />
          <DInput label="Stock Quantity" name="Stock" type="number" />

          <DInput label="discount" name="discount" type="number" />
          <DSelect
            options={categoriesOptions}
            name="category"
            label="Category"
          />
        </div>
        <div className="mt-6">
          <DTextArea label="Description" name="description" />
        </div>
        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </DialogFooter>
      </DForm>
    </DialogContent>
  );
};

export default ProductCreateForm;
