/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInostance";

// ✅ Place an order
export const placeOrder = async (orderData: Record<string, unknown>) => {
  try {
    const { data } = await axiosInstance.post("/orders", orderData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

// ✅ Get all orders for user
export const getUserOrders = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/orders/user/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user orders");
  }
};

// ✅ Get single order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const { data } = await axiosInstance.get(`/orders/${orderId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch order");
  }
};

// ✅ Update order status (Admin)
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data } = await axiosInstance.patch(`/orders/${orderId}`, { status });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update order status");
  }
};
