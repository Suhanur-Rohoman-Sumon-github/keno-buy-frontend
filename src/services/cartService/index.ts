/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInostance";

// ✅ Add product to cart
export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  try {
    const { data } = await axiosInstance.post(`/cart/${userId}`, {
      productId,
      quantity,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

// ✅ Get user's cart
export const getCart = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/cart/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

// ✅ Update item quantity in cart
export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  try {
    const { data } = await axiosInstance.patch(`/cart/${userId}/${productId}`, { quantity });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update cart item");
  }
};

// ✅ Remove product from cart
export const removeFromCart = async (userId: string, productId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${userId}/${productId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to remove from cart");
  }
};

// ✅ Clear entire cart
export const clearCart = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};
