export enum PipelineType {
  EXTRACTION = "extraction",
  TRANSFORMATION = "transformation",
  LOADING = "loading",
  COMPLETE = "complete",
}

export enum PipelineStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum PipelineStepType {
  FILE_READER = "file_reader",
  API_FETCHER = "api_fetcher",
  DATABASE_EXTRACTOR = "database_extractor",
  TEXT_EXTRACTOR = "text_extractor",
  LLM_ENTITY_EXTRACTOR = "llm_entity_extractor",
  FIBO_MAPPER = "fibo_mapper",
  ENTITY_RESOLUTION = "entity_resolution",
  KNOWLEDGE_GRAPH_WRITER = "knowledge_graph_writer",
  CUSTOM_PYTHON = "custom_python",
}

export interface StepConfig {
  // Base model for step configurations
}

export interface FileReaderConfig extends StepConfig {
  file_id: string; // UUID
  encoding?: string;
  chunk_size?: number;
}

export interface ApiFetcherConfig extends StepConfig {
  url: string; // AnyHttpUrl
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: Record<string, any>;
  auth_type?: string;
  auth_config?: Record<string, any>;
  pagination?: Record<string, any>;
}

export interface DatabaseExtractorConfig extends StepConfig {
  connection_string: string;
  query: string;
  params?: Record<string, any>;
  batch_size?: number;
}

export interface TextExtractorConfig extends StepConfig {
  input_format: string; // pdf, docx, html, etc.
  extract_tables?: boolean;
  extract_metadata?: boolean;
  language?: string;
  chunk_size?: number;
  chunk_overlap?: number;
}

export interface LlmEntityExtractorConfig extends StepConfig {
  model?: string;
  temperature?: number;
  entity_types?: string[];
  prompt_template?: string;
  max_tokens?: number;
  extract_relationships?: boolean;
  context_window?: number;
}

export interface FiboMapperConfig extends StepConfig {
  mapping_confidence_threshold?: number;
  save_mappings?: boolean;
  suggest_mappings?: boolean;
  domains?: string[];
  verify_mappings?: boolean;
}

export interface EntityResolutionConfig extends StepConfig {
  resolution_strategy?: string; // exact_match, fuzzy_match, embedding
  similarity_threshold?: number;
  match_on?: string[];
  fuzzy_algorithm?: string;
  handle_conflicts?: string; // keep_both, keep_newest, keep_highest_confidence
  embedding_model?: string;
}

export interface KnowledgeGraphWriterConfig extends StepConfig {
  batch_size?: number;
  create_if_not_exists?: boolean;
  update_if_exists?: boolean;
  store_metadata?: boolean;
  track_provenance?: boolean;
  commit_strategy?: string; // batch, single, transaction
}

export interface CustomPythonConfig extends StepConfig {
  code: string;
  requirements?: string[];
  input_mapping?: Record<string, string>;
  output_mapping?: Record<string, string>;
  timeout?: number; // seconds
}

export interface PipelineStep {
  id: string; // UUID
  name: string;
  type: PipelineStepType;
  config: StepConfig | Record<string, any>;
  inputs?: string[]; // IDs of steps that feed into this step
  enabled?: boolean;
}

export interface PipelineBase {
  name: string;
  description?: string;
  pipeline_type: PipelineType;
  steps: PipelineStep[];
  schedule?: string; // CRON expression
}

export interface PipelineCreate extends Omit<PipelineBase, "steps"> {
  steps: Omit<PipelineStep, "id">[];
}

export interface PipelineUpdate {
  name?: string;
  description?: string;
  pipeline_type?: PipelineType;
  steps?: PipelineStep[];
  schedule?: string;
  is_active?: boolean;
}

export interface Pipeline extends PipelineBase {
  id: string; // UUID
  is_active: boolean;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PipelineRunBase {
  pipeline_id: string; // UUID
  status: PipelineStatus;
  triggered_by?: string;
}

export interface PipelineRunCreate extends PipelineRunBase {
  // No additional fields
}

export interface PipelineRun extends PipelineRunBase {
  id: string; // UUID
  start_time: Date;
  end_time?: Date;
  duration?: number; // in seconds
  log?: string;
  error_message?: string;
  stats?: Record<string, any>;
  created_at: Date;
}

export interface PipelineStepResult {
  step_id: string; // UUID
  status: PipelineStatus;
  output?: Record<string, any>;
  error_message?: string;
  start_time: Date;
  end_time?: Date;
  duration?: number; // in seconds
}

export interface PipelineRunUpdate {
  status?: PipelineStatus;
  end_time?: Date;
  duration?: number;
  log?: string;
  error_message?: string;
  stats?: Record<string, any>;
}

export interface PipelineRunLog {
  pipeline_id: string; // UUID
  run_id: string;
  logs: Record<string, any>[];
  step_results: Record<string, PipelineStepResult>;
}

export interface PipelineRunStatus {
  status: PipelineStatus;
  start_time: Date;
  end_time?: Date;
  duration?: number; // in seconds
  stats?: Record<string, any>;
}
