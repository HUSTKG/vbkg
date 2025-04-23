import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../config/axios";
import {
  PipelineCreate,
  PipelineUpdate,
  PipelineRunCreate,
} from "../schemas/pipeline.schemas";

// Create Pipeline
export const useCreatePipeline = (
  options: UseMutationOptions<any, Error, PipelineCreate>,
) => {
  return useMutation({
    mutationFn: async (input: PipelineCreate) =>
      await api()
        .post("/", input)
        .then((res) => res.data),
    ...options,
  });
};

// Update Pipeline
export const useUpdatePipeline = (
  options: UseMutationOptions<
    any,
    Error,
    { pipelineId: string; data: PipelineUpdate }
  >,
) => {
  return useMutation({
    mutationFn: async ({ pipelineId, data }) =>
      await api()
        .patch(`/${pipelineId}`, data)
        .then((res) => res.data),
    ...options,
  });
};

// Delete Pipeline
export const useDeletePipeline = (
  options: UseMutationOptions<any, Error, string>,
) => {
  return useMutation({
    mutationFn: async (pipelineId: string) =>
      await api()
        .delete(`/${pipelineId}`)
        .then((res) => res.data),
    ...options,
  });
};

// Run Pipeline
export const useRunPipeline = (
  options: UseMutationOptions<any, Error, PipelineRunCreate>,
) => {
  return useMutation({
    mutationFn: async (input: PipelineRunCreate) =>
      await api()
        .post("/run", input)
        .then((res) => res.data),
    ...options,
  });
};

// Cancel Pipeline Run
export const useCancelPipelineRun = (
  options: UseMutationOptions<any, Error, string>,
) => {
  return useMutation({
    mutationFn: async (runId: string) =>
      await api()
        .post(`/pipelines/runs/${runId}/cancel`)
        .then((res) => res.data),
    ...options,
  });
};
