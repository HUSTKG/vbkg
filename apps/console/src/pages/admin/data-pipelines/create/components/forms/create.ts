import {
  Pipeline,
  PipelineStep,
  PipelineStepType,
  PipelineType,
} from "@vbkg/types";
import { FieldConfig } from "@vbkg/ui";

export const formCreatePipelineConfig = [
  {
    name: "name",
    label: "Pipeline Name",
    type: "text",
    required: true,
    placeholder: "Enter pipeline name",
    description: "A descriptive name for your pipeline",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter pipeline description",
    description: "Optional description of the pipeline's purpose",
  },
  {
    name: "pipeline_type",
    label: "Pipeline Type",
    type: "select",
    required: true,
    options: [
      { label: "Extraction", value: PipelineType.EXTRACTION },
      { label: "Transformation", value: PipelineType.TRANSFORMATION },
      { label: "Loading", value: PipelineType.LOADING },
      { label: "Complete ETL", value: PipelineType.COMPLETE },
    ],
    description: "The type of data processing this pipeline performs",
  },
  {
    name: "is_active",
    label: "Active",
    type: "switch",
    description: "Enable or disable this pipeline",
  },
  {
    name: "schedule",
    label: "Schedule",
    type: "text",
    placeholder: "0 0 * * *",
    description:
      "CRON expression for scheduling the pipeline (leave empty for manual execution only)",
  },
] satisfies FieldConfig[];

// Generate input options for step configuration
const getInputOptions = (pipeline: Pipeline, activeStep: string) => {
  if (!pipeline) return [];

  return pipeline.steps
    .filter((step) => step.id !== activeStep) // Exclude current step
    .map((step) => ({
      label: step.name,
      value: step.id,
    }));
};

// Generate config fields based on step type
const getConfigFields = (stepType: PipelineStepType): FieldConfig[] => {
  switch (stepType) {
    case PipelineStepType.FILE_READER:
      return [
        {
          name: "file_id",
          label: "File ID",
          type: "text",
          required: true,
          placeholder: "Enter file UUID",
          description: "UUID of the file to read",
        },
        {
          name: "encoding",
          label: "Encoding",
          type: "select",
          options: [
            { label: "UTF-8", value: "utf-8" },
            { label: "ASCII", value: "ascii" },
            { label: "ISO-8859-1", value: "iso-8859-1" },
          ],
          placeholder: "Select encoding",
          description: "Character encoding of the file",
        },
        {
          name: "chunk_size",
          label: "Chunk Size",
          type: "number",
          placeholder: "Enter chunk size in bytes",
          description: "Size of chunks to read the file in bytes",
        },
      ];

    case PipelineStepType.API_FETCHER:
      return [
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
          placeholder: "https://api.example.com/endpoint",
          description: "API endpoint URL",
        },
        {
          name: "method",
          label: "HTTP Method",
          type: "select",
          options: [
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
            { label: "DELETE", value: "DELETE" },
            { label: "PATCH", value: "PATCH" },
          ],
          placeholder: "Select HTTP method",
          defaultValue: "GET",
        },
        {
          name: "headers",
          label: "Headers",
          type: "textarea",
          placeholder:
            '{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer ${API_KEY}"\n}',
          description: "HTTP headers as JSON object",
        },
        {
          name: "params",
          label: "Query Parameters",
          type: "textarea",
          placeholder: '{\n  "limit": 100,\n  "offset": 0\n}',
          description: "Query parameters as JSON object",
        },
        {
          name: "body",
          label: "Request Body",
          type: "textarea",
          placeholder: '{\n  "key": "value"\n}',
          description: "Request body as JSON object (for POST, PUT, PATCH)",
        },
      ];

    case PipelineStepType.DATABASE_EXTRACTOR:
      return [
        {
          name: "connection_string",
          label: "Connection String",
          type: "text",
          required: true,
          placeholder: "postgresql://user:pass@host:port/database",
          description: "Database connection string",
        },
        {
          name: "query",
          label: "SQL Query",
          type: "textarea",
          required: true,
          placeholder: "SELECT * FROM table WHERE condition = :param",
          description: "SQL query to execute",
        },
        {
          name: "params",
          label: "Query Parameters",
          type: "textarea",
          placeholder: '{\n  "param": "value"\n}',
          description: "Parameters for the SQL query as JSON object",
        },
        {
          name: "batch_size",
          label: "Batch Size",
          type: "number",
          placeholder: "1000",
          description: "Number of records to fetch in each batch",
        },
      ];

    case PipelineStepType.TEXT_EXTRACTOR:
      return [
        {
          name: "input_format",
          label: "Input Format",
          type: "select",
          required: true,
          options: [
            { label: "PDF", value: "pdf" },
            { label: "DOCX", value: "docx" },
            { label: "HTML", value: "html" },
            { label: "TXT", value: "txt" },
            { label: "MARKDOWN", value: "md" },
          ],
          placeholder: "Select input format",
        },
        {
          name: "extract_tables",
          label: "Extract Tables",
          type: "switch",
          description: "Extract tables from documents (if applicable)",
        },
        {
          name: "extract_metadata",
          label: "Extract Metadata",
          type: "switch",
          description: "Extract document metadata",
        },
        {
          name: "language",
          label: "Document Language",
          type: "select",
          options: [
            { label: "English", value: "en" },
            { label: "Spanish", value: "es" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Chinese", value: "zh" },
            { label: "Japanese", value: "ja" },
            { label: "Auto-detect", value: "auto" },
          ],
          defaultValue: "auto",
          description: "Language of the document",
        },
        {
          name: "chunk_size",
          label: "Chunk Size",
          type: "number",
          placeholder: "1000",
          description: "Size of text chunks in characters",
        },
        {
          name: "chunk_overlap",
          label: "Chunk Overlap",
          type: "number",
          placeholder: "200",
          description: "Overlap between chunks in characters",
        },
      ];

    case PipelineStepType.LLM_ENTITY_EXTRACTOR:
      return [
        {
          name: "model",
          label: "LLM Model",
          type: "select",
          options: [
            { label: "GPT-4", value: "gpt-4" },
            { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
            { label: "Claude 3 Opus", value: "claude-3-opus" },
            { label: "Claude 3 Sonnet", value: "claude-3-sonnet" },
            { label: "Llama 3", value: "llama-3" },
          ],
          placeholder: "Select LLM model",
        },
        {
          name: "temperature",
          label: "Temperature",
          type: "number",
          placeholder: "0.0",
          description: "Sampling temperature (0.0 to 1.0)",
          defaultValue: 0.0,
        },
        {
          name: "entity_types",
          label: "Entity Types",
          type: "textarea",
          placeholder: '["person", "organization", "location", "date"]',
          description: "Types of entities to extract as JSON array",
        },
        {
          name: "prompt_template",
          label: "Prompt Template",
          type: "textarea",
          placeholder:
            "Extract the following entities from the text:\n{entity_types}\n\nText: {text}",
          description: "Template for the extraction prompt",
        },
        {
          name: "max_tokens",
          label: "Max Tokens",
          type: "number",
          placeholder: "1000",
          description: "Maximum tokens for response",
        },
        {
          name: "extract_relationships",
          label: "Extract Relationships",
          type: "switch",
          description: "Extract relationships between entities",
          defaultValue: false,
        },
      ];

    case PipelineStepType.CUSTOM_PYTHON:
      return [
        {
          name: "code",
          label: "Python Code",
          type: "textarea",
          required: true,
          placeholder:
            "def process(data):\n    # Transform the data\n    return transformed_data",
          description: "Python code to execute",
          className: "h-60", // Taller textarea for code
        },
        {
          name: "requirements",
          label: "Requirements",
          type: "textarea",
          placeholder: "pandas\nnumpy\nrequests",
          description: "Python packages to install (one per line)",
        },
        {
          name: "input_mapping",
          label: "Input Mapping",
          type: "textarea",
          placeholder: '{\n  "input_data": "step1.output"\n}',
          description: "Map inputs from previous steps as JSON object",
        },
        {
          name: "output_mapping",
          label: "Output Mapping",
          type: "textarea",
          placeholder: '{\n  "transformed_data": "output"\n}',
          description: "Map outputs to variable names as JSON object",
        },
        {
          name: "timeout",
          label: "Timeout (seconds)",
          type: "number",
          placeholder: "300",
          description: "Maximum execution time in seconds",
          defaultValue: 300,
        },
      ];

    // Add cases for other step types as needed

    default:
      return [
        {
          name: "config",
          label: "Configuration",
          type: "textarea",
          placeholder: '{\n  "key": "value"\n}',
          description: "Configuration as JSON object",
        },
      ];
  }
};

// Generate step configuration form fields
export const generateStepConfigFields = (
  step: PipelineStep,
  pipeline: Pipeline,
): FieldConfig[] => {
  const baseFields: FieldConfig[] = [
    {
      name: "name",
      label: "Step Name",
      type: "text",
      required: true,
      placeholder: "Enter step name",
      description: "A descriptive name for this step",
    },
    {
      name: "enabled",
      label: "Enabled",
      type: "switch",
      description: "Enable or disable this step",
    },
    {
      name: "inputs",
      label: "Input Steps",
      type: "checkbox",
      options: getInputOptions(pipeline, step.id),
      description: "Select steps that provide input to this step",
    },
  ];

  // Get config fields based on step type
  const configFields = getConfigFields(step.step_type as PipelineStepType);

  // Transform config fields to have proper names
  const transformedConfigFields = configFields.map((field) => ({
    ...field,
    name: `config.${field.name}`,
  }));

  return [...baseFields, ...transformedConfigFields];
};
