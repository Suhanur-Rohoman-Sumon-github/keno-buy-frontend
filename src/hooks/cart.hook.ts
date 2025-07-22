/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/services/cartService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCart = (userId: string) =>
  useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
  });

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add to cart"],
    mutationFn: async (params: { userId: string; productId: string; quantity?: number }) =>
      addToCart(params.userId, params.productId, params.quantity || 1),
    onSuccess: () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update cart item"],
    mutationFn: async (params: { userId: string; productId: string; quantity: number }) =>
      updateCartItem(params.userId, params.productId, params.quantity),
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove from cart"],
    mutationFn: async (params: { userId: string; productId: string }) =>
      removeFromCart(params.userId, params.productId),
    onSuccess: () => {
      toast.success("Removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["clear cart"],
    mutationFn: async (userId: string) => clearCart(userId),
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
