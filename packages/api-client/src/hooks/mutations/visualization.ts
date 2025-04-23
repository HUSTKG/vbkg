import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../config/axios";
import {
  VisualizationCreate,
  VisualizationUpdate,
  DefaultVisualizationRequest,
} from "../schemas/visualization.schemas";

// Create Visualization
export const useCreateVisualization = (
  options: UseMutationOptions<any, Error, VisualizationCreate>,
) => {
  return useMutation({
    mutationFn: async (input: VisualizationCreate) =>
      await api()
        .post("/visualizations", input)
        .then((res) => res.data),
    ...options,
  });
};

// Update Visualization
export const useUpdateVisualization = (
  options: UseMutationOptions<
    any,
    Error,
    { visualizationId: string; data: VisualizationUpdate }
  >,
) => {
  return useMutation({
    mutationFn: async ({ visualizationId, data }) =>
      await api()
        .patch(`/visualizations/${visualizationId}`, data)
        .then((res) => res.data),
    ...options,
  });
};

// Delete Visualization
export const useDeleteVisualization = (
  options: UseMutationOptions<any, Error, string>,
) => {
  return useMutation({
    mutationFn: async (visualizationId: string) =>
      await api()
        .delete(`/visualizations/${visualizationId}`)
        .then((res) => res.data),
    ...options,
  });
};

// Create Default Visualization
export const useCreateDefaultVisualization = (
  options: UseMutationOptions<any, Error, DefaultVisualizationRequest>,
) => {
  return useMutation({
    mutationFn: async (input: DefaultVisualizationRequest) =>
      await api()
        .post("/visualizations/default", input)
        .then((res) => res.data),
    ...options,
  });
};
