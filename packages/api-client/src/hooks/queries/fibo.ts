import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IReadFiboClassesRequest,
  IReadFiboClassesResponse,
  IReadFiboClassRequest,
  IReadFiboClassResponse,
  IReadFiboPropertiesRequest,
  IReadFiboPropertiesResponse,
  IReadFiboPropertyRequest,
  IReadFiboPropertyResponse,
  IReadEntityMappingsRequest,
  IReadEntityMappingsResponse,
  IReadRelationshipMappingsRequest,
  IReadRelationshipMappingsResponse,
  ISuggestFiboClassesRequest,
  ISuggestFiboClassesResponse,
  ISuggestFiboPropertiesRequest,
  ISuggestFiboPropertiesResponse,
} from "@vbkg/types";
import { FiboService } from "../../services/fibo";

// FIBO Classes
export const useFiboClasses = (
  input: IReadFiboClassesRequest,
  options?: UseQueryOptions<IReadFiboClassesResponse, Error>,
) => {
  return useQuery<IReadFiboClassesResponse, Error>({
    queryKey: ["fiboClasses", input],
    queryFn: () => FiboService.readFiboClasses(input),
    ...options,
  });
};

export const useFiboClass = (
  input: IReadFiboClassRequest,
  options?: UseQueryOptions<IReadFiboClassResponse, Error>,
) => {
  return useQuery<IReadFiboClassResponse, Error>({
    queryKey: ["fiboClass", input.id],
    queryFn: () => FiboService.readFiboClass(input),
    ...options,
  });
};

// FIBO Properties
export const useFiboProperties = (
  input: IReadFiboPropertiesRequest,
  options?: UseQueryOptions<IReadFiboPropertiesResponse, Error>,
) => {
  return useQuery<IReadFiboPropertiesResponse, Error>({
    queryKey: ["fiboProperties", input],
    queryFn: () => FiboService.readFiboProperties(input),
    ...options,
  });
};

export const useFiboProperty = (
  input: IReadFiboPropertyRequest,
  options?: UseQueryOptions<IReadFiboPropertyResponse, Error>,
) => {
  return useQuery<IReadFiboPropertyResponse, Error>({
    queryKey: ["fiboProperty", input.id],
    queryFn: () => FiboService.readFiboProperty(input),
    ...options,
  });
};

// Entity Mappings
export const useEntityMappings = (
  input: IReadEntityMappingsRequest,
  options?: UseQueryOptions<IReadEntityMappingsResponse, Error>,
) => {
  return useQuery<IReadEntityMappingsResponse, Error>({
    queryKey: ["entityMappings", input],
    queryFn: () => FiboService.readEntityMappings(input),
    ...options,
  });
};

// Relationship Mappings
export const useRelationshipMappings = (
  input: IReadRelationshipMappingsRequest,
  options?: UseQueryOptions<IReadRelationshipMappingsResponse, Error>,
) => {
  return useQuery<IReadRelationshipMappingsResponse, Error>({
    queryKey: ["relationshipMappings", input],
    queryFn: () => FiboService.readRelationshipMappings(input),
    ...options,
  });
};

// Suggestions
export const useSuggestFiboClasses = (
  input: ISuggestFiboClassesRequest,
  options?: UseQueryOptions<ISuggestFiboClassesResponse, Error>,
) => {
  return useQuery<ISuggestFiboClassesResponse, Error>({
    queryKey: ["suggestFiboClasses", input],
    queryFn: () => FiboService.suggestFiboClasses(input),
    ...options,
  });
};

export const useSuggestFiboProperties = (
  input: ISuggestFiboPropertiesRequest,
  options?: UseQueryOptions<ISuggestFiboPropertiesResponse, Error>,
) => {
  return useQuery<ISuggestFiboPropertiesResponse, Error>({
    queryKey: ["suggestFiboProperties", input],
    queryFn: () => FiboService.suggestFiboProperties(input),
    ...options,
  });
};
