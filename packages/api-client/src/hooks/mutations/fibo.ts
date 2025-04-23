import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  ICreateFiboClassRequest,
  ICreateFiboClassResponse,
  IUpdateFiboClassRequest,
  IUpdateFiboClassResponse,
  IDeleteFiboClassRequest,
  IDeleteFiboClassResponse,
  ICreateFiboPropertyRequest,
  ICreateFiboPropertyResponse,
  IUpdateFiboPropertyRequest,
  IUpdateFiboPropertyResponse,
  IDeleteFiboPropertyRequest,
  IDeleteFiboPropertyResponse,
  IImportOntologyRequest,
  IImportOntologyResponse,
  ICreateEntityMappingRequest,
  ICreateEntityMappingResponse,
  IDeleteEntityMappingRequest,
  IDeleteEntityMappingResponse,
  IVerifyEntityMappingRequest,
  IVerifyEntityMappingResponse,
  ICreateRelationshipMappingRequest,
  ICreateRelationshipMappingResponse,
  IDeleteRelationshipMappingRequest,
  IDeleteRelationshipMappingResponse,
  IVerifyRelationshipMappingRequest,
  IVerifyRelationshipMappingResponse,
} from "@vbkg/types";
import { FiboService } from "../../services/fibo";

// FIBO Class operations
export const useCreateFiboClass = (
  options: UseMutationOptions<
    ICreateFiboClassResponse,
    Error,
    ICreateFiboClassRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.createFiboClass,
    ...options,
  });
};

export const useUpdateFiboClass = (
  options: UseMutationOptions<
    IUpdateFiboClassResponse,
    Error,
    IUpdateFiboClassRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.updateFiboClass,
    ...options,
  });
};

export const useDeleteFiboClass = (
  options: UseMutationOptions<
    IDeleteFiboClassResponse,
    Error,
    IDeleteFiboClassRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.deleteFiboClass,
    ...options,
  });
};

// FIBO Property operations
export const useCreateFiboProperty = (
  options: UseMutationOptions<
    ICreateFiboPropertyResponse,
    Error,
    ICreateFiboPropertyRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.createFiboProperty,
    ...options,
  });
};

export const useUpdateFiboProperty = (
  options: UseMutationOptions<
    IUpdateFiboPropertyResponse,
    Error,
    IUpdateFiboPropertyRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.updateFiboProperty,
    ...options,
  });
};

export const useDeleteFiboProperty = (
  options: UseMutationOptions<
    IDeleteFiboPropertyResponse,
    Error,
    IDeleteFiboPropertyRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.deleteFiboProperty,
    ...options,
  });
};

// Ontology operations
export const useImportOntology = (
  options: UseMutationOptions<
    IImportOntologyResponse,
    Error,
    IImportOntologyRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.importOntology,
    ...options,
  });
};

// Entity Mapping operations
export const useCreateEntityMapping = (
  options: UseMutationOptions<
    ICreateEntityMappingResponse,
    Error,
    ICreateEntityMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.createEntityMapping,
    ...options,
  });
};

export const useDeleteEntityMapping = (
  options: UseMutationOptions<
    IDeleteEntityMappingResponse,
    Error,
    IDeleteEntityMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.deleteEntityMapping,
    ...options,
  });
};

export const useVerifyEntityMapping = (
  options: UseMutationOptions<
    IVerifyEntityMappingResponse,
    Error,
    IVerifyEntityMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.verifyEntityMapping,
    ...options,
  });
};

// Relationship Mapping operations
export const useCreateRelationshipMapping = (
  options: UseMutationOptions<
    ICreateRelationshipMappingResponse,
    Error,
    ICreateRelationshipMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.createRelationshipMapping,
    ...options,
  });
};

export const useDeleteRelationshipMapping = (
  options: UseMutationOptions<
    IDeleteRelationshipMappingResponse,
    Error,
    IDeleteRelationshipMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.deleteRelationshipMapping,
    ...options,
  });
};

export const useVerifyRelationshipMapping = (
  options: UseMutationOptions<
    IVerifyRelationshipMappingResponse,
    Error,
    IVerifyRelationshipMappingRequest
  >,
) => {
  return useMutation({
    mutationFn: FiboService.verifyRelationshipMapping,
    ...options,
  });
};
