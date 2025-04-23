import { z } from "zod";

// Schema for retrieving FIBO classes with optional filters
export const ReadFiboClassesSchema = z.object({
  domain: z.string().optional(), // Optional domain filter
  search: z.string().optional(), // Optional search filter
  is_custom: z.boolean().optional(), // Optional filter for custom classes
  limit: z.number().min(1).max(1000).default(100), // Pagination limit
  skip: z.number().min(0).default(0), // Pagination offset
});

// Schema for retrieving a FIBO class by ID
export const ReadFiboClassByIdSchema = z.object({
  class_id: z.number().int(), // Class ID must be an integer
});

// Schema for creating a FIBO class
export const CreateFiboClassSchema = z.object({
  name: z.string().min(1), // Class name is required
  description: z.string().optional(), // Optional description
  properties: z.array(z.string()).optional(), // Optional properties
});

// Schema for updating a FIBO class
export const UpdateFiboClassSchema = z.object({
  class_id: z.number().int(), // Class ID must be an integer
  name: z.string().min(1).optional(), // Optional class name update
  description: z.string().optional(), // Optional description update
  properties: z.array(z.string()).optional(), // Optional properties update
});

// Schema for deleting a FIBO class
export const DeleteFiboClassSchema = z.object({
  class_id: z.number().int(), // Class ID must be an integer
});

// Schema for retrieving FIBO properties with optional filters
export const ReadFiboPropertiesSchema = z.object({
  domain_class_id: z.number().int().optional(), // Optional filter by class ID
  property_type: z.enum(["object", "datatype"]).optional(), // Optional property type filter
  search: z.string().optional(), // Optional search filter
  is_custom: z.boolean().optional(), // Optional filter for custom properties
  limit: z.number().min(1).max(1000).default(100), // Pagination limit
  skip: z.number().min(0).default(0), // Pagination offset
});

// Schema for retrieving a FIBO property by ID
export const ReadFiboPropertyByIdSchema = z.object({
  property_id: z.number().int(), // Property ID must be an integer
});

// Schema for creating a FIBO property
export const CreateFiboPropertySchema = z.object({
  name: z.string().min(1), // Property name is required
  type: z.enum(["object", "datatype"]), // Property type is required
  description: z.string().optional(), // Optional description
});

// Schema for updating a FIBO property
export const UpdateFiboPropertySchema = z.object({
  property_id: z.number().int(), // Property ID must be an integer
  name: z.string().min(1).optional(), // Optional property name update
  type: z.enum(["object", "datatype"]).optional(), // Optional property type update
  description: z.string().optional(), // Optional description update
});

// Schema for deleting a FIBO property
export const DeleteFiboPropertySchema = z.object({
  property_id: z.number().int(), // Property ID must be an integer
});

// Schema for importing an ontology
export const ImportOntologySchema = z
  .object({
    file_id: z.string().optional(), // Optional file ID
    url: z.string().url().optional(), // Optional URL
    format: z.string().optional(), // Optional format
  })
  .refine((data) => data.file_id || data.url, {
    message: "Either file_id or url must be provided",
  });

// Schema for retrieving entity mappings
export const ReadEntityMappingsSchema = z.object({
  verified_only: z.boolean().default(false), // Optional filter for verified mappings
  limit: z.number().min(1).max(1000).default(100), // Pagination limit
  skip: z.number().min(0).default(0), // Pagination offset
});
