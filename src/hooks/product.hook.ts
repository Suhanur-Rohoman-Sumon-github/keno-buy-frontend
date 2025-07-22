/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getRelatedProducts,
  addToFavorite,
  getFavoriteProducts,
} from "@/services/productService";

// Fetch all products
export const useGetProducts = (query?: Record<string, string>) =>
  useQuery({
    queryKey: ["products", query],
    queryFn: () => getAllProducts(query),
  });

// Fetch single product
export const useGetSingleProduct = (productId: string) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

// Create product (Admin)
export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create product"],
    mutationFn: async (productData: FormData) => {
      await createProduct(productData);
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Add to favorites
export const useAddToFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add to favorites"],
    mutationFn: async ({ userId, productId }: { userId: string; productId: string }) => {
      await addToFavorite(userId, productId);
    },
    onSuccess: () => {
      toast.success("Added to favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Get user favorite products
export const useGetFavoriteProducts = (userId: string) =>
  useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavoriteProducts(userId),
    enabled: !!userId,
  });
