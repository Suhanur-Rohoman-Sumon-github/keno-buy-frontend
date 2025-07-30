/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  getSingleProduct,
  addToFavorite,
  getFavoriteProducts,
  getALlProducts,
  updateProduct,
} from "@/services/productService";

// Fetch all products
export const useGetAllProductsQuery = (queryParams: {
  category?: string;
  categoryId?: string;
  rating?: number | "";
  sort?: string | "";
  searchTerm?: string | "";
}, p0: { keepPreviousData: boolean; }, ) => {

  console.log(`Fetching products with params: ${JSON.stringify(queryParams)}`);
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
    
    queryKey: ["get-products", queryParams],
    queryFn: async () => {
      const data = await getALlProducts(queryParams);
     
      return data.data;

    },
  });

  return { data, refetch, isLoading, isError };
};

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


  export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: ({ productId, payload }: { productId: string; payload: Record<string, unknown> }) =>
   updateProduct(productId, payload),

    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] }); // optionally invalidate single product query as well
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update product");
    },
  });
};