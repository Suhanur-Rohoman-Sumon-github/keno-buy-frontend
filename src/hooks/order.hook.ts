/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "@/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const usePlaceOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["place order"],
    mutationFn: async (orderData: FieldValues) => placeOrder(orderData),
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetUserOrders = (userId: string) =>
  useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId),
    enabled: !!userId,
  });

export const useGetOrderById = (orderId: string) =>
  useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update order status"],
    mutationFn: async (params: { orderId: string; status: string }) =>
      updateOrderStatus(params.orderId, params.status),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
