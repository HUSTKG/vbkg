import {
  ApiResponse,
  PaginatedResponse,
  Pipeline,
  PipelineCreate,
  PipelineRun,
  PipelineRunStatus,
  PipelineStatus,
  PipelineUpdate,
} from "../models";

export interface IReadPipelinesRequest {
  skip?: number;
  limit?: number;
  pipeline_type?: string;
  is_active?: boolean;
}
export interface IReadPipelinesResponse extends PaginatedResponse<Pipeline> {}

export interface ICreatePipelineRequest extends PipelineCreate {}
export interface ICreatePipelineResponse extends ApiResponse<Pipeline> {}

export interface IReadPipelineRequest {
  id: string;
}
export interface IReadPipelineResponse extends ApiResponse<Pipeline> {}

export interface IUpdatePipelineRequest extends PipelineUpdate {
  id: string;
}
export interface IUpdatePipelineResponse extends ApiResponse<Pipeline> {}

export interface IDeletePipelineRequest {
  id: string;
}
export interface IDeletePipelineResponse extends ApiResponse<unknown> {}

export interface IRunPipelineRequest {
  id: string;
}
export interface IRunPipelineResponse extends ApiResponse<PipelineRun> {}

export interface IReadPipelineRunsRequest {
  skip?: number;
  limit: number;
  pipeline_id?: string;
  status?: PipelineStatus;
}
export interface IReadPipelineRunsResponse
  extends PaginatedResponse<PipelineRun> {}

export interface IReadPipelineRunRequest {
  id: string;
}
export interface IReadPipelineRunResponse extends ApiResponse<PipelineRun> {}

export interface IGetPipelineRunStatusRequest {
  id: string;
}
export interface IGetPipelineRunStatusResponse
  extends ApiResponse<PipelineRunStatus> {}

export interface ICancelPipelineRunRequest {
  id: string;
}
export interface ICancelPipelineRunResponse extends ApiResponse<null> {}
