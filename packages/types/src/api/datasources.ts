import { ApiResponse, DataSource, PaginatedResponse } from "../models";
import {
  DataSourceCreate,
  FileUpload,
  FileUploadStatus,
  SourceType,
} from "../models/datasource";

export interface ICreateDatasourceRequest extends DataSourceCreate {}

export interface ICreateDatasourceResponse extends ApiResponse<DataSource> {}

export interface IGetDatasourceRequest {
	id: string;
}
export interface IGetDatasourceResponse {}

export interface IGetDatasourcesRequest {
  skip?: number;
  limit?: number;
  source_type?: SourceType;
  is_active?: boolean;
}

export interface IGetDatasourcesResponse
  extends PaginatedResponse<DataSource> {}

export interface IUpdateDatasourceRequest {
  id: string;
}
export interface IUpdateDatasourceResponse extends ApiResponse<DataSource> {}

export interface IDeleteDatasourceRequest {
  id: string;
}
export interface IDeleteDatasourceResponse extends ApiResponse<unknown> {}

export interface IUploadFileRequest {
  datasource_id: string;
  file: File;
  metadata?: Record<string, any>;
}
export interface IUploadFileResponse extends ApiResponse<FileUpload> {}

export interface IGetFileUploadsRequest {
  datasource_id?: string;
  status?: FileUploadStatus;
  processed?: boolean;
  skip?: number;
  limit?: number;
}
export interface IGetFileUploadsResponse
  extends PaginatedResponse<FileUpload> {}

export interface IGetFileUploadRequest {
  id: string;
}
export interface IGetFileUploadResponse extends ApiResponse<FileUpload> {}

export interface IUpdateFileStatusRequest {
  id: string;
  status: FileUploadStatus;
  error_message?: string;
  processed?: boolean;
}
export interface IUpdateFileStatusResponse extends ApiResponse<FileUpload> {}

export interface IDeleteFileUploadRequest {
  id: string;
}
export interface IDeleteFileUploadResponse extends ApiResponse<unknown> {}

export interface IGetFileContentRequest {
  id: string;
}
export interface IGetFileContentResponse {}
