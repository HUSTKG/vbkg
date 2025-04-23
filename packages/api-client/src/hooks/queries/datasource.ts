import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IGetDatasourceRequest,
  IGetDatasourceResponse,
  IGetDatasourcesRequest,
  IGetDatasourcesResponse,
  IGetFileContentRequest,
  IGetFileContentResponse,
  IGetFileUploadRequest,
  IGetFileUploadResponse,
  IGetFileUploadsRequest,
  IGetFileUploadsResponse,
} from "@vbkg/types";
import { DatasourceService } from "../../services/datasource";

// Fetch all datasources
export const useDatasources = (
  input: IGetDatasourcesRequest,
  options?: UseQueryOptions<IGetDatasourcesResponse, Error>,
) => {
  return useQuery<IGetDatasourcesResponse, Error>({
    queryKey: ["datasources", input],
    queryFn: () => DatasourceService.readDatasources(input),
    ...options,
  });
};

// Fetch a specific datasource
export const useDatasource = (
  input: IGetDatasourceRequest,
  options?: UseQueryOptions<IGetDatasourceResponse, Error>,
) => {
  return useQuery<IGetDatasourceResponse, Error>({
    queryKey: ["datasource", input.id],
    queryFn: () => DatasourceService.readDatasource(input),
    ...options,
  });
};

// Fetch all file uploads
export const useFileUploads = (
  input: IGetFileUploadsRequest,
  options?: UseQueryOptions<IGetFileUploadsResponse, Error>,
) => {
  return useQuery<IGetFileUploadsResponse, Error>({
    queryKey: ["fileUploads", input],
    queryFn: () => DatasourceService.readUploadFiles(input),
    ...options,
  });
};

// Fetch a specific file upload
export const useFileUpload = (
  input: IGetFileUploadRequest,
  options?: UseQueryOptions<IGetFileUploadResponse, Error>,
) => {
  return useQuery<IGetFileUploadResponse, Error>({
    queryKey: ["fileUpload", input.id],
    queryFn: () => DatasourceService.readUploadFile(input),
    ...options,
  });
};

// Fetch file content
export const useFileContent = (
  input: IGetFileContentRequest,
  options?: UseQueryOptions<IGetFileContentResponse, Error>,
) => {
  return useQuery<IGetFileContentResponse, Error>({
    queryKey: ["fileContent", input.id],
    queryFn: () => DatasourceService.getFileContent(input),
    ...options,
  });
};
