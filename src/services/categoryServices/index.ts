"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/AxiosInostance";

export const getAllCategory = async () => {
  try {
    const { data } = await axiosInstance.get(`/category`);
  
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user category");
  }
};
export const createCategory = async (category:any) => {
  try {
    const { data } = await axiosInstance.get(`/category`,category);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user category");
  }
};