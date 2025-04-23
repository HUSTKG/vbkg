import { ApiResponse, PaginatedResponse } from "../models";
import {
  EntityMapping,
  FIBOClass,
  FIBOClassCreate,
  FIBOClassUpdate,
  FIBOProperty,
  FIBOPropertyCreate,
  FIBOPropertyUpdate,
  OntologyImportRequest,
  OntologyImportResponse,
  RelationshipMapping,
} from "../models/fibo";

export interface IReadFiboClassesRequest {
  domain?: string;
  search?: string;
  is_custom?: boolean;
  limit?: number;
  skip?: number;
}
export interface IReadFiboClassesResponse
  extends PaginatedResponse<FIBOClass> {}

export interface IReadFiboClassRequest {
  id: string;
}
export interface IReadFiboClassResponse extends ApiResponse<FIBOClass> {}

export interface ICreateFiboClassRequest extends FIBOClassCreate {}
export interface ICreateFiboClassResponse extends ApiResponse<FIBOClass> {}

export interface IUpdateFiboClassRequest extends FIBOClassUpdate {
  id: string;
}
export interface IUpdateFiboClassResponse extends ApiResponse<FIBOClass> {}

export interface IDeleteFiboClassRequest {
  id: string;
}
export interface IDeleteFiboClassResponse extends ApiResponse<unknown> {}

export interface IReadFiboPropertiesRequest {
  domain_class_id?: string;
  property_type?: "object" | "datatype";
  search?: string;
  is_custom?: boolean;
  limit?: number;
  skip?: number;
}
export interface IReadFiboPropertiesResponse
  extends PaginatedResponse<FIBOProperty> {}

export interface IReadFiboPropertyRequest {}
export interface IReadFiboPropertyResponse extends ApiResponse<FIBOProperty> {}

export interface ICreateFiboPropertyRequest extends FIBOPropertyCreate {}
export interface ICreateFiboPropertyResponse
  extends ApiResponse<FIBOProperty> {}

export interface IUpdateFiboPropertyRequest extends FIBOPropertyUpdate {
  id: string;
}
export interface IUpdateFiboPropertyResponse
  extends ApiResponse<FIBOProperty> {}

export interface IDeleteFiboPropertyRequest {
  id: string;
}
export interface IDeleteFiboPropertyResponse extends ApiResponse<unknown> {}

export interface IImportOntologyRequest extends OntologyImportRequest {}
export interface IImportOntologyResponse
  extends ApiResponse<OntologyImportResponse> {}

export interface IReadEntityMappingsRequest {
  verified_only?: boolean;
  limit?: number;
  skip?: number;
}
export interface IReadEntityMappingsResponse
  extends PaginatedResponse<EntityMapping> {}

export interface ICreateEntityMappingRequest {
  mapping: EntityMapping;
}
export interface ICreateEntityMappingResponse {}

export interface IDeleteEntityMappingRequest {
  id: string;
}
export interface IDeleteEntityMappingResponse extends ApiResponse<unknown> {}

export interface IVerifyEntityMappingRequest {
  entity_type: string;
  verified: boolean;
}
export interface IVerifyEntityMappingResponse extends ApiResponse<unknown> {}

export interface IReadRelationshipMappingsRequest {
  verified_only: boolean;
  limit?: number;
  skip?: number;
}
export interface IReadRelationshipMappingsResponse
  extends PaginatedResponse<RelationshipMapping> {}

export interface ICreateRelationshipMappingRequest {
  mapping: RelationshipMapping;
}
export interface ICreateRelationshipMappingResponse
  extends ApiResponse<RelationshipMapping> {}

export interface IDeleteRelationshipMappingRequest {
  id: string;
}
export interface IDeleteRelationshipMappingResponse
  extends ApiResponse<unknown> {}

export interface IVerifyRelationshipMappingRequest {
  relationship_type: string;
  verified: boolean;
}
export interface IVerifyRelationshipMappingResponse
  extends ApiResponse<unknown> {}

export interface ISuggestFiboClassesRequest {
  entity_text: string;
  entity_type: string;
  max_suggestions: number;
}
export interface ISuggestFiboClassesResponse extends ApiResponse<FIBOClass[]> {}

export interface ISuggestFiboPropertiesRequest {
  relationship_type: string;
  source_entity_type: string;
  target_entity_type: string;
  max_suggestions: number;
}
export interface ISuggestFiboPropertiesResponse
  extends ApiResponse<FIBOProperty[]> {}
