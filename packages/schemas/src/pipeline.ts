import { PipelineStepType, PipelineType } from "@vbkg/types";
import { z } from "zod";

// Step configuration schemas for different step types
const _FileReaderConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.FILE_READER),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    file_id: z.string().uuid(),
    encoding: z.string().default("utf-8"),
    chunk_size: z.number().optional(),
  }),
});

const _ApiFetcherConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.API_FETCHER),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    url: z.string().url(),
    method: z.string().default("GET"),
    headers: z.record(z.string()).optional(),
    params: z.record(z.any()).optional(),
    body: z.record(z.any()).optional(),
    auth_type: z.string().optional(),
    auth_config: z.record(z.any()).optional(),
  }),
});

const _DatabaseExtractorConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.DATABASE_EXTRACTOR),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    connection_string: z.string(),
    query: z.string(),
    params: z.record(z.any()).optional(),
    batch_size: z.number().default(1000),
  }),
});

const _TextExtractorConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.TEXT_EXTRACTOR),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    input_format: z.string(),
    extract_tables: z.boolean().default(false),
    extract_metadata: z.boolean().default(true),
    language: z.string().optional(),
    chunk_size: z.number().default(1000),
    chunk_overlap: z.number().default(200),
  }),
});

const _LlmEntityExtractorConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.LLM_ENTITY_EXTRACTOR),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    model: z.string().default("gpt-3.5-turbo-0125"),
    temperature: z.number().default(0.2),
    entity_types: z.array(z.string()).default([]),
    prompt_template: z.string().optional(),
    max_tokens: z.number().default(1000),
    extract_relationships: z.boolean().default(false),
    context_window: z.number().default(4000),
  }),
});

const _FiboMapperConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.FIBO_MAPPER),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    mapping_confidence_threshold: z.number().default(0.7),
    save_mappings: z.boolean().default(true),
    suggest_mappings: z.boolean().default(true),
    domains: z.array(z.string()).default([]),
    verify_mappings: z.boolean().default(false),
  }),
});

const _EntityResolutionConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.ENTITY_RESOLUTION),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    resolution_strategy: z.string().default("exact_match"),
    similarity_threshold: z.number().default(0.8),
    match_on: z.array(z.string()).default(["text"]),
    fuzzy_algorithm: z.string().optional(),
    handle_conflicts: z.string().default("keep_both"),
    embedding_model: z.string().optional(),
  }),
});

const _KnowledgeGraphWriterConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.KNOWLEDGE_GRAPH_WRITER),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    batch_size: z.number().default(100),
    create_if_not_exists: z.boolean().default(true),
    update_if_exists: z.boolean().default(false),
    store_metadata: z.boolean().default(true),
    track_provenance: z.boolean().default(true),
    commit_strategy: z.string().default("batch"),
  }),
});

const _CustomPythonConfigSchema = z.object({
  step_type: z.literal(PipelineStepType.CUSTOM_PYTHON),
  name: z.string(),
  inputs: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  config: z.object({
    code: z.string(),
    requirements: z.array(z.string()).default([]),
    input_mapping: z.record(z.string()).default({}),
    output_mapping: z.record(z.string()).default({}),
    timeout: z.number().default(60),
  }),
});

const PipelineStepConfigSchema = z.discriminatedUnion("step_type", [
  _FileReaderConfigSchema,
  _ApiFetcherConfigSchema,
  _DatabaseExtractorConfigSchema,
  _TextExtractorConfigSchema,
  _LlmEntityExtractorConfigSchema,
  _FiboMapperConfigSchema,
  _EntityResolutionConfigSchema,
  _KnowledgeGraphWriterConfigSchema,
  _CustomPythonConfigSchema,
]);

// Schema for retrieving pipelines with optional filters
export const ReadPipelinesSchema = z.object({
  skip: z.number().min(0).default(0), // Pagination offset
  limit: z.number().min(1).default(100), // Pagination limit
  pipeline_type: z.string().optional(), // Optional filter by pipeline type
  is_active: z.boolean().optional(), // Optional filter for active pipelines
});

// Schema for creating a pipeline
export const CreatePipelineSchema = z.object({
  name: z.string(), // Pipeline name
  description: z.string().optional(), // Optional description
  pipeline_type: z.nativeEnum(PipelineType), // Pipeline type
  steps: z.array(
    PipelineStepConfigSchema, // Use our strongly-typed step config schema
  ),
  schedule: z.string().optional(), // Optional schedule (CRON expression)
  is_active: z.boolean().default(true), // Default to active
});

// Schema for retrieving a specific pipeline by ID
export const ReadPipelineByIdSchema = z.object({
  pipeline_id: z.string().uuid(), // Pipeline ID must be a valid UUID
});

// Schema for updating a pipeline
export const UpdatePipelineSchema = z.object({
  pipeline_id: z.string().uuid(), // Pipeline ID must be a valid UUID
  name: z.string().optional(), // Optional name update
  description: z.string().optional(), // Optional description update
  type: z.string().optional(), // Optional type update
  config: z.record(z.string(), z.any()).optional(), // Optional configuration update
});

// Schema for deleting a pipeline
export const DeletePipelineSchema = z.object({
  pipeline_id: z.string().uuid(), // Pipeline ID must be a valid UUID
});

// Schema for running a pipeline
export const RunPipelineSchema = z.object({
  pipeline_id: z.string().uuid(), // Pipeline ID must be a valid UUID
  params: z.record(z.string(), z.any()).optional(), // Optional parameters for the pipeline run
});

// Schema for retrieving pipeline runs
export const ReadPipelineRunsSchema = z.object({
  skip: z.number().min(0).default(0), // Pagination offset
  limit: z.number().min(1).default(100), // Pagination limit
  pipeline_id: z.string().uuid().optional(), // Optional filter by pipeline ID
  status: z.string().optional(), // Optional filter by pipeline run status
});

// Schema for retrieving a specific pipeline run by ID
export const ReadPipelineRunByIdSchema = z.object({
  run_id: z.string().uuid(), // Pipeline run ID must be a valid UUID
});

// Schema for retrieving the status of a pipeline run
export const GetPipelineRunStatusSchema = z.object({
  run_id: z.string().uuid(), // Pipeline run ID must be a valid UUID
});

// Schema for cancelling a pipeline run
export const CancelPipelineRunSchema = z.object({
  run_id: z.string().uuid(), // Pipeline run ID must be a valid UUID
});
