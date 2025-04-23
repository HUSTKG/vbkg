import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IReadEntityRequest, IReadEntityResponse } from "@vbkg/types";
import { KnowledgeService } from "../../services/knowledge";

// Fetch a specific entity
export const useFetchEntity = (
  input: IReadEntityRequest,
  options?: UseQueryOptions<IReadEntityResponse, Error, IReadEntityRequest>,
) => {
  return useQuery<IReadEntityResponse, Error, IReadEntityRequest>({
    queryKey: ["entity", input],
    queryFn: async () => KnowledgeService.readEntity(input),
    ...options,
  });
};
