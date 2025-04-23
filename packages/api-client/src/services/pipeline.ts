import {
  ICancelPipelineRunRequest,
  ICancelPipelineRunResponse,
  ICreatePipelineRequest,
  ICreatePipelineResponse,
  IDeletePipelineRequest,
  IDeletePipelineResponse,
  IGetPipelineRunStatusRequest,
  IGetPipelineRunStatusResponse,
  IReadPipelineRequest,
  IReadPipelineResponse,
  IReadPipelineRunRequest,
  IReadPipelineRunResponse,
  IReadPipelineRunsRequest,
  IReadPipelineRunsResponse,
  IReadPipelinesRequest,
  IReadPipelinesResponse,
  IRunPipelineRequest,
  IRunPipelineResponse,
  IUpdatePipelineRequest,
  IUpdatePipelineResponse,
} from "@vbkg/types";
import { api } from "../config/axios";
import { API_ENDPOINTS } from "@vbkg/utils";

const readPipelines = async (
  input: IReadPipelinesRequest,
): Promise<IReadPipelinesResponse> => {
  return await api()
    .get<IReadPipelinesResponse>(API_ENDPOINTS.READ_PIPELINES, {
      params: input,
    })
    .then((res) => res.data);
};

const createPipeline = async (
  input: ICreatePipelineRequest,
): Promise<ICreatePipelineResponse> => {
  return await api()
    .post<ICreatePipelineResponse>(API_ENDPOINTS.CREATE_PIPELINE, input)
    .then((res) => res.data);
};

const readPipeline = async (
  input: IReadPipelineRequest,
): Promise<IReadPipelineResponse> => {
  return await api()
    .get<IReadPipelineResponse>(API_ENDPOINTS.READ_PIPELINE(input.id), {
      params: input,
    })
    .then((res) => res.data);
};

const updatePipeline = async (
  input: IUpdatePipelineRequest,
): Promise<IUpdatePipelineResponse> => {
  return await api()
    .put<IUpdatePipelineResponse>(
      API_ENDPOINTS.UPDATE_PIPELINE(input.id),
      input,
    )
    .then((res) => res.data);
};

const deletePipeline = async (
  input: IDeletePipelineRequest,
): Promise<IDeletePipelineResponse> => {
  return await api()
    .delete<IDeletePipelineResponse>(API_ENDPOINTS.DELETE_PIPELINE(input.id))
    .then((res) => res.data);
};

const runPipeline = async (
  input: IRunPipelineRequest,
): Promise<IRunPipelineResponse> => {
  return await api()
    .post<IRunPipelineResponse>(API_ENDPOINTS.RUN_PIPELINE(input.id), input)
    .then((res) => res.data);
};

const readPipelineRuns = async (
  input: IReadPipelineRunsRequest,
): Promise<IReadPipelineRunsResponse> => {
  return await api()
    .get<IReadPipelineRunsResponse>(API_ENDPOINTS.READ_PIPELINE_RUNS, {
      params: input,
    })
    .then((res) => res.data);
};

const readPipelineRun = async (
  input: IReadPipelineRunRequest,
): Promise<IReadPipelineRunResponse> => {
  return await api()
    .get<IReadPipelineRunResponse>(API_ENDPOINTS.READ_PIPELINE_RUN(input.id), {
      params: input,
    })
    .then((res) => res.data);
};

const getPipelineRunStatus = async (
  input: IGetPipelineRunStatusRequest,
): Promise<IGetPipelineRunStatusResponse> => {
  return await api()
    .get<IGetPipelineRunStatusResponse>(
      API_ENDPOINTS.GET_PIPELINE_RUN_STATUS(input.id),
      {
        params: input,
      },
    )
    .then((res) => res.data);
};

const cancelPipelineRun = async (
  input: ICancelPipelineRunRequest,
): Promise<ICancelPipelineRunResponse> => {
  return await api()
    .post<ICancelPipelineRunResponse>(
      API_ENDPOINTS.CANCEL_PIPELINE_RUN(input.id),
      input,
    )
    .then((res) => res.data);
};

export const PipelineService = {
  readPipelines,
  createPipeline,
  readPipeline,
  updatePipeline,
  deletePipeline,
  runPipeline,
  readPipelineRuns,
  readPipelineRun,
  getPipelineRunStatus,
  cancelPipelineRun,
};
