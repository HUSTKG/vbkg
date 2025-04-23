import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  ICreateDatasourceRequest,
  ICreateDatasourceResponse,
  IDeleteDatasourceRequest,
  IDeleteDatasourceResponse,
  IDeleteFileUploadRequest,
  IDeleteFileUploadResponse,
  IUpdateDatasourceRequest,
  IUpdateDatasourceResponse,
  IUpdateFileStatusRequest,
  IUpdateFileStatusResponse,
  IUploadFileRequest,
  IUploadFileResponse,
} from "@vbkg/types";
import { DatasourceService } from "../../services/datasource";

// Datasource CRUD operations
export const useCreateDatasource = (
  options: UseMutationOptions<
    ICreateDatasourceResponse,
    Error,
    ICreateDatasourceRequest
  >,
) => {
  return useMutation<
    ICreateDatasourceResponse,
    Error,
    ICreateDatasourceRequest
  >({
    mutationFn: DatasourceService.createDatasource,
    ...options,
  });
};

export const useUpdateDatasource = (
  options: UseMutationOptions<
    IUpdateDatasourceResponse,
    Error,
    IUpdateDatasourceRequest
  >,
) => {
  return useMutation<
    IUpdateDatasourceResponse,
    Error,
    IUpdateDatasourceRequest
  >({
    mutationFn: DatasourceService.updateDatasource,
    ...options,
  });
};

export const useDeleteDatasource = (
  options: UseMutationOptions<
    IDeleteDatasourceResponse,
    Error,
    IDeleteDatasourceRequest
  >,
) => {
  return useMutation<
    IDeleteDatasourceResponse,
    Error,
    IDeleteDatasourceRequest
  >({
    mutationFn: DatasourceService.deleteDatasource,
    ...options,
  });
};

// File upload operations
export const useUploadFile = (
  options: UseMutationOptions<IUploadFileResponse, Error, IUploadFileRequest>,
) => {
  return useMutation<IUploadFileResponse, Error, IUploadFileRequest>({
    mutationFn: DatasourceService.uploadFile,
    ...options,
  });
};

export const useDeleteFileUpload = (
  options: UseMutationOptions<
    IDeleteFileUploadResponse,
    Error,
    IDeleteFileUploadRequest
  >,
) => {
  return useMutation<
    IDeleteFileUploadResponse,
    Error,
    IDeleteFileUploadRequest
  >({
    mutationFn: DatasourceService.deleteFileUpload,
    ...options,
  });
};

export const useUpdateFileStatus = (
  options: UseMutationOptions<
    IUpdateFileStatusResponse,
    Error,
    IUpdateFileStatusRequest
  >,
) => {
  return useMutation<
    IUpdateFileStatusResponse,
    Error,
    IUpdateFileStatusRequest
  >({
    mutationFn: DatasourceService.updateFileStatus,
    ...options,
  });
};
