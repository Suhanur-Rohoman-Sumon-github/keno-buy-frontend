/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCategory, getAllCategory } from "@/services/categoryServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCategoryQuery = () =>
  useQuery({
    queryKey: ["categories"], // Changed key to categories
    queryFn: () => getAllCategory(),
  });

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: any) => createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
    },
  });
};
