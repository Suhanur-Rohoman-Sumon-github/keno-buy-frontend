/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInostance";

// ✅ Get all products (supports search/filter/pagination)
export const getAllProducts = async (query?: Record<string, string>) => {
  try {
    const { data } = await axiosInstance.get("/products");
    
    return data.data || [];
  } catch (error: any) {
    throw new Error(error.response || "Failed to fetch products");
  }
};

// ✅ Get single product by ID
export const getSingleProduct = async (productId: string) => {
console.log(`Fetching product with ID: ${productId}`);
  try {
    const { data } = await axiosInstance.get(`/products/${productId}`);
    console.log(data);
    return data.data || {};
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};

// ✅ Get related products by category
export const getRelatedProducts = async (category: string) => {
  try {
    const { data } = await axiosInstance.get(`/products/related/${category}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch related products");
  }
};

// ✅ Add product to favorites
export const addToFavorite = async (userId: string, productId: string) => {
  try {
    const { data } = await axiosInstance.post(`/products/favorites/${userId}/${productId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add to favorites");
  }
};

// ✅ Get favorite products
export const getFavoriteProducts = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/products/favorites/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch favorite products");
  }
};

// ✅ Create product (Admin)
export const createProduct = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post("/products", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// ✅ Update product
export const updateProduct = async (productId: string, payload: Record<string, unknown>) => {
  try {
    const { data } = await axiosInstance.patch(`/products/${productId}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};
