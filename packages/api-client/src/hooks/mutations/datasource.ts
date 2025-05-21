import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ICreateDatasourceRequest,
  ICreateDatasourceResponse,
  IDeleteDatasourceRequest,
  IDeleteDatasourceResponse,
  IUpdateDatasourceRequest,
  IUpdateDatasourceResponse,
} from "@vbkg/types";
import { DatasourceService } from "../../services/datasource";
import { QueryKeys } from "../../config/queryKeys";

// Datasource CRUD operations
export const useCreateDatasource = (
  options: UseMutationOptions<
    ICreateDatasourceResponse,
    Error,
    ICreateDatasourceRequest
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<
    ICreateDatasourceResponse,
    Error,
    ICreateDatasourceRequest
  >({
    mutationFn: DatasourceService.createDatasource,
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.datasources.list() });
      options?.onSuccess?.(...params);
    },
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
    onSuccess: (...params) => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: QueryKeys.datasources.list() });
      options.onSuccess?.(...params);
    },
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
    onSuccess: (...params) => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: QueryKeys.datasources.list() });
      options.onSuccess?.(...params);
    },
  });
};
