import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api } from "../config/axios";
import { EntitySearchParams } from "../schemas/entity.schemas";

// Search Entities
export const useSearchEntities = (
  options: UseMutationOptions<any, Error, EntitySearchParams>
) => {
  return useMutation({
    mutationFn: async (input: EntitySearchParams) =>
      await api().post("/search/entities", input).then(res => res.data),
    ...options,
  });
};
