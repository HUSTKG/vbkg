import { z } from "zod";

// Schema for creating a data source
export const CreateDataSourceSchema = z.object({
  name: z.string().min(1), // Name is required
  type: z.enum(["TYPE_A", "TYPE_B"]), // Example enum for source type
  config: z.record(z.string(), z.any()).optional(), // Config is optional
});

// Schema for updating a data source
export const UpdateDataSourceSchema = z.object({
  name: z.string().min(1).optional(), // Name can be updated or omitted
  config: z.record(z.string(), z.any()).optional(), // Config can be updated or omitted
});

// Schema for reading data sources with optional filters
export const ReadDataSourcesSchema = z.object({
  skip: z.number().min(0).default(0), // Pagination offset
  limit: z.number().min(1).default(100), // Pagination limit
  source_type: z.string().optional(), // Optional filter for source type
  is_active: z.boolean().optional(), // Optional filter for active status
});

// Schema for retrieving a specific data source by ID
export const ReadDataSourceByIdSchema = z.object({
  datasource_id: z.string().uuid(), // ID must be a valid UUID
});

// Schema for file upload metadata
export const FileUploadMetadataSchema = z.object({
  metadata: z.string().optional(), // Optional JSON metadata as a string
});

// Schema for updating file status
export const UpdateFileStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"]), // Example enum for file status
  processed: z.boolean().optional(), // Indicates if the file is processed
  error_message: z.string().optional(), // Optional error message
});

// Schema for retrieving file uploads with optional filters
export const ReadFileUploadsSchema = z.object({
  datasource_id: z.string().uuid().optional(), // Optional filter by datasource ID
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"]).optional(), // Optional filter for file status
  processed: z.boolean().optional(), // Optional filter for processed files
  skip: z.number().min(0).default(0), // Pagination offset
  limit: z.number().min(1).default(100), // Pagination limit
});

// Schema for retrieving a specific file upload by ID
export const ReadFileUploadByIdSchema = z.object({
  file_id: z.string().uuid(), // ID must be a valid UUID
});

// Schema for deleting a file upload
export const DeleteFileUploadSchema = z.object({
  file_id: z.string().uuid(), // ID must be a valid UUID
});

// Schema for retrieving file content
export const GetFileContentSchema = z.object({
  file_id: z.string().uuid(), // ID must be a valid UUID
});
