import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IReadPipelinesRequest,
  IReadPipelinesResponse,
  IReadPipelineRequest,
  IReadPipelineResponse,
  IReadPipelineRunsRequest,
  IReadPipelineRunsResponse,
  IReadPipelineRunRequest,
  IReadPipelineRunResponse,
  IGetPipelineRunStatusRequest,
  IGetPipelineRunStatusResponse,
} from "@vbkg/types";
import { PipelineService } from "../../services/pipeline";

// Fetch all pipelines
export const usePipelines = (
  input: IReadPipelinesRequest,
  options?: UseQueryOptions<IReadPipelinesResponse, Error>,
) => {
  return useQuery<IReadPipelinesResponse, Error>({
    queryKey: ["pipelines", input],
    queryFn: () => PipelineService.readPipelines(input),
    ...options,
  });
};

// Fetch a specific pipeline
export const usePipeline = (
  input: IReadPipelineRequest,
  options?: UseQueryOptions<IReadPipelineResponse, Error>,
) => {
  return useQuery<IReadPipelineResponse, Error>({
    queryKey: ["pipeline", input.id],
    queryFn: () => PipelineService.readPipeline(input),
    ...options,
  });
};

// Fetch all pipeline runs
export const usePipelineRuns = (
  input: IReadPipelineRunsRequest,
  options?: UseQueryOptions<IReadPipelineRunsResponse, Error>,
) => {
  return useQuery<IReadPipelineRunsResponse, Error>({
    queryKey: ["pipelineRuns", input],
    queryFn: () => PipelineService.readPipelineRuns(input),
    ...options,
  });
};

// Fetch a specific pipeline run
export const usePipelineRun = (
  input: IReadPipelineRunRequest,
  options?: UseQueryOptions<IReadPipelineRunResponse, Error>,
) => {
  return useQuery<IReadPipelineRunResponse, Error>({
    queryKey: ["pipelineRun", input.id],
    queryFn: () => PipelineService.readPipelineRun(input),
    ...options,
  });
};

// Get pipeline run status
export const usePipelineRunStatus = (
  input: IGetPipelineRunStatusRequest,
  options?: UseQueryOptions<IGetPipelineRunStatusResponse, Error>,
) => {
  return useQuery<IGetPipelineRunStatusResponse, Error>({
    queryKey: ["pipelineRunStatus", input.id],
    queryFn: () => PipelineService.getPipelineRunStatus(input),
    ...options,
  });
};
