export type FIBOClassBase = { 
  uri: string;
  label?: string;
  description?: string;
  domain?: string;
  properties?: Record<string, any>;
};

export type FIBOClassCreate = FIBOClassBase & {
  parent_class_uri?: string;
  is_custom: boolean;
};

export type FIBOClassUpdate = Partial<FIBOClassBase> & {
  parent_class_uri?: string;
};

export type FIBOClass = FIBOClassBase & {
  id: number; 
  parent_class_id?: number;
  is_custom: boolean;
  created_at: Date;
  updated_at: Date;
};

export type FIBOPropertyBase = { 
  uri: string;
  label?: string;
  description?: string;
  property_type: string; // 'object' or 'datatype'
};

export type FIBOPropertyCreate = FIBOPropertyBase & {
  domain_class_uri?: string;
  range_class_uri?: string;
  is_custom: boolean;
};

export type FIBOPropertyUpdate = Partial<FIBOPropertyBase> & {
  domain_class_uri?: string;
  range_class_uri?: string;
  property_type?: string;
};

export type FIBOProperty = FIBOPropertyBase & {
  id: number;
  domain_class_id?: number;
  range_class_id?: number;
  is_custom: boolean;
  created_at: Date;
  updated_at: Date;
};

export type EntityMapping = {
  entity_type: string;
  fibo_class_uri: string;
  confidence?: number;
  is_verified: boolean;
};

export type RelationshipMapping = {
  relationship_type: string;
  fibo_property_uri: string;
  confidence?: number;
  is_verified: boolean;
};

export type OntologyImportRequest = {
  file_id?: string;
  url?: string;
  format: "rdf" | "owl" | "ttl"; // rdf, owl, ttl
};

export type OntologyImportResponse = {
  status: string;
  message: string;
  imported_classes?: number;
  imported_properties?: number;
  errors?: string[];
};
