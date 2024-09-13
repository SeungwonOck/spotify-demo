import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchCategories = () => {
  return api().get(`/v1/browse/categories`);
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    select: (res) => res.data.categories.items,
  });
};
