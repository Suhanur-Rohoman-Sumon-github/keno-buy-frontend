/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInostance";
import axios from "axios";

// ✅ Get all products (supports search/filter/pagination)
export const getALlProducts = async (queryParams: {
  
  category?: string;
 categoryId?:string
sort?: string | "";
  searchTerm?: string | "";
}) => {
  try {
    const { category, sort,searchTerm,categoryId } =
      queryParams;

    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (categoryId) query.append("categoryId", categoryId);
    if (sort) query.append("sort", sort);
    if (searchTerm) query.append("searchTerm", searchTerm);

    const { data } = await axiosInstance.get(`/products?${query?.toString()}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
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
export const createProduct = async (productData: any) => {
 
  try {
    const { data } = await axiosInstance.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      const message = error.response?.data?.message || "Failed to create product (server error)";
      throw new Error(message);
    }

    // Catch any other unexpected error
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
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
