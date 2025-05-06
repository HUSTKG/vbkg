import { useCreatePipeline, usePipelines } from "@vbkg/api-client";
import { CreatePipelineSchema } from "@vbkg/schemas";
import { Pipeline, PipelineStepType, PipelineType } from "@vbkg/types";
import {
  AppForm,
  Button,
  Card,
  DeleteDialog,
  Dialog,
  ErrorNotification,
  FieldConfig,
  OntologyGraph,
  SuccessNotification,
} from "@vbkg/ui";
import { useState } from "react";

const getPipelineStepConfig = (step_type: PipelineStepType): FieldConfig[] => {
  switch (step_type) {
    case PipelineStepType.API_FETCHER:
      return [
        {
          label: "API URL",
          name: "url",
          type: "text",
          placeholder: "Enter API URL",
          required: true,
        },
        {
          label: "Method",
          name: "method",
          type: "select",
          placeholder: "Select HTTP method",
          options: [
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
            { label: "DELETE", value: "DELETE" },
          ],
          required: true,
        },
        {
          label: "Headers",
          name: "headers",
          type: "textarea",
          placeholder: "Enter headers in JSON format",
        },
        {
          label: "Query Parameters",
          name: "params",
          type: "textarea",
          placeholder: "Enter query parameters in JSON format",
        },
        {
          label: "Body",
          name: "body",
          type: "textarea",
          placeholder: "Enter body in JSON format",
        },
        {
          label: "Authentication Type",
          name: "auth_type",
          type: "select",
          placeholder: "Select authentication type",
          options: [
            { label: "Basic", value: "BASIC" },
            { label: "Bearer", value: "BEARER" },
          ],
        },
        {
          label: "Authentication Config",
          name: "auth_config",
          type: "textarea",
          placeholder: "Enter authentication config in JSON format",
        },
      ];
    case PipelineStepType.CUSTOM_PYTHON:
      return [
        {
          label: "Python Code",
          name: "code",
          type: "textarea",
          placeholder: "Enter Python code",
          required: true,
        },
        {
          label: "Requirements",
          name: "requirements",
          type: "textarea",
          placeholder: "Enter requirements in JSON format",
        },
        {
          label: "Input Mapping",
          name: "input_mapping",
          type: "textarea",
          placeholder: "Enter input mapping in JSON format",
        },
        {
          label: "Output Mapping",
          name: "output_mapping",
          type: "textarea",
          placeholder: "Enter output mapping in JSON format",
        },
        {
          label: "Timeout",
          name: "timeout",
          type: "number",
          placeholder: "Enter timeout in seconds",
          required: true,
        },
      ];
    case PipelineStepType.FIBO_MAPPER:
      return [
        {
          label: "Mapping Confidence Threshold",
          name: "mapping_confidence_threshold",
          type: "number",
          placeholder: "Enter mapping confidence threshold",
          required: true,
        },
        {
          label: "Save Mappings",
          name: "save_mappings",
          type: "checkbox",
          placeholder: "Save mappings",
        },
        {
          label: "Suggest Mappings",
          name: "suggest_mappings",
          type: "checkbox",
          placeholder: "Suggest mappings",
        },
        {
          label: "Domains",
          name: "domains",
          type: "textarea",
          placeholder: "Enter domains in JSON format",
        },
        {
          label: "Verify Mappings",
          name: "verify_mappings",
          type: "checkbox",
          placeholder: "Verify mappings",
        },
      ];
    case PipelineStepType.FILE_READER:
      return [
        {
          label: "File ID",
          name: "file_id",
          type: "text",
          placeholder: "Enter file ID",
          required: true,
        },
        {
          label: "Encoding",
          name: "encoding",
          type: "text",
          placeholder: "Enter encoding (e.g., utf-8)",
        },
        {
          label: "Chunk Size",
          name: "chunk_size",
          type: "number",
          placeholder: "Enter chunk size",
        },
      ];
    case PipelineStepType.KNOWLEDGE_GRAPH_WRITER:
      return [
        {
          label: "Batch Size",
          name: "batch_size",
          type: "number",
          placeholder: "Enter batch size",
          required: true,
        },
        {
          label: "Create If Not Exists",
          name: "create_if_not_exists",
          type: "checkbox",
          placeholder: "Create if not exists",
        },
        {
          label: "Update If Exists",
          name: "update_if_exists",
          type: "checkbox",
          placeholder: "Update if exists",
        },
        {
          label: "Store Metadata",
          name: "store_metadata",
          type: "checkbox",
          placeholder: "Store metadata",
        },
        {
          label: "Track Provenance",
          name: "track_provenance",
          type: "checkbox",
          placeholder: "Track provenance",
        },
        {
          label: "Commit Strategy",
          name: "commit_strategy",
          type: "select",
          placeholder: "Select commit strategy",
          options: [
            { label: "Batch", value: "batch" },
            { label: "Single", value: "single" },
            { label: "Transaction", value: "transaction" },
          ],
          required: true,
        },
      ];
    case PipelineStepType.LLM_ENTITY_EXTRACTOR:
      return [
        {
          label: "Model",
          name: "model",
          type: "text",
          placeholder: "Enter model name",
        },
        {
          label: "Temperature",
          name: "temperature",
          type: "number",
          placeholder: "Enter temperature value",
        },
        {
          label: "Entity Types",
          name: "entity_types",
          type: "textarea",
          placeholder: "Enter entity types in JSON format",
        },
        {
          label: "Prompt Template",
          name: "prompt_template",
          type: "textarea",
          placeholder: "Enter prompt template",
        },
        {
          label: "Max Tokens",
          name: "max_tokens",
          type: "number",
          placeholder: "Enter max tokens",
        },
        {
          label: "Extract Relationships",
          name: "extract_relationships",
          type: "checkbox",
          placeholder: "Extract relationships",
        },
        {
          label: "Context Window",
          name: "context_window",
          type: "number",
          placeholder: "Enter context window size",
        },
      ];
    case PipelineStepType.TEXT_EXTRACTOR:
      return [
        {
          label: "Input Format",
          name: "input_format",
          type: "text",
          placeholder: "Enter input format (e.g., pdf, docx)",
          required: true,
        },
        {
          label: "Extract Tables",
          name: "extract_tables",
          type: "checkbox",
          placeholder: "Extract tables",
        },
        {
          label: "Extract Metadata",
          name: "extract_metadata",
          type: "checkbox",
          placeholder: "Extract metadata",
        },
        {
          label: "Language",
          name: "language",
          type: "text",
          placeholder: "Enter language code (e.g., en)",
        },
      ];
    case PipelineStepType.ENTITY_RESOLUTION:
      return [
        {
          label: "Resolution Strategy",
          name: "resolution_strategy",
          type: "text",
          placeholder: "Enter resolution strategy",
          required: true,
        },
        {
          label: "Similarity Threshold",
          name: "similarity_threshold",
          type: "number",
          placeholder: "Enter similarity threshold",
        },
        {
          label: "Match On",
          name: "match_on",
          type: "textarea",
          placeholder: "Enter fields to match on in JSON format",
        },
        {
          label: "Fuzzy Algorithm",
          name: "fuzzy_algorithm",
          type: "text",
          placeholder: "Enter fuzzy algorithm",
        },
        {
          label: "Handle Conflicts",
          name: "handle_conflicts",
          type: "text",
          placeholder: "Enter conflict handling strategy",
        },
        {
          label: "Embedding Model",
          name: "embedding_model",
          type: "text",
          placeholder: "Enter embedding model name",
        },
      ];
    default:
      return [];
  }
};

export default function ConfigureDataPipeline() {
  const pipelines = usePipelines({})?.data?.data || [];

  const { mutate: createPipeline } = useCreatePipeline({
    onSuccess: (data) => {
      console.log("Pipeline created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating pipeline", error);
    },
  });

  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(
    null,
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Pipeline Configuration</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          Create New Pipeline
        </Button>
      </div>

      {/* Pipeline Flow Visualization */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Pipeline Flow</h2>
        <div className="h-[600px]">
          <OntologyGraph
            classes={[
              { id: "source", name: "Data Sources" },
              { id: "etl", name: "ETL Process" },
              { id: "validation", name: "Validation" },
              { id: "target", name: "Knowledge Graph" },
            ]}
            relations={[
              { source: "source", target: "etl", name: "Extract", id: "1" },
              {
                source: "etl",
                target: "validation",
                name: "Transform",
                id: "2",
              },
              { source: "validation", target: "target", name: "Load", id: "3" },
            ]}
          />
        </div>
      </Card>

      {/* Notifications */}
      {notification &&
        (notification.type === "success" ? (
          <SuccessNotification
            title="Success"
            message={notification.message}
            onDelete={() => setNotification(null)}
            time={new Date().toLocaleTimeString()}
            id="notification"
          />
        ) : (
          <ErrorNotification
            title="Error"
            message={notification.message}
            onDelete={() => setNotification(null)}
            time={new Date().toLocaleTimeString()}
            id="notification"
          />
        ))}

      {/* Create Pipeline Dialog */}
      <Dialog
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title="Create New Pipeline"
        contentClassName="max-w-4xl max-h-[80vh] overflow-y-auto"
        showFooter={false}
      >
        <AppForm
          schema={CreatePipelineSchema}
          onSubmit={(values) => {
            createPipeline({
              name: values.name,
              pipeline_type: values.pipeline_type,
              description: values.description,
              steps: values.steps,
              schedule: values.schedule,
            });
          }}
          fields={(formData) => [
            {
              label: "Pipeline Name",
              name: "name",
              type: "text",
              placeholder: "Enter pipeline name",
              required: true,
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              placeholder: "Enter pipeline description",
            },
            {
              label: "Type",
              name: "pipeline_type",
              type: "select",
              placeholder: "Select pipeline type",
              options: [
                { label: "Loading", value: PipelineType.LOADING },
                { label: "Complete", value: PipelineType.COMPLETE },
                { label: "Extraction", value: PipelineType.EXTRACTION },
                { label: "Transformation", value: PipelineType.TRANSFORMATION },
              ],
              required: true,
            },
            {
              label: "Schedule",
              name: "schedule",
              type: "text",
              placeholder: "Enter schedule (e.g., daily, hourly)",
            },
            {
              label: "Steps",
              name: "steps",
              type: "array",
              placeholder: "Enter steps in JSON format",
              arrayItemLabel: "Step",
              fields: [
                {
                  label: "Step Name",
                  name: "name",
                  type: "text",
                  placeholder: "Enter step name",
                  required: true,
                },
                {
                  label: "Step Type",
                  name: "type",
                  placeholder: "Select step type",
                  type: "select",
                  options: [
                    {
                      label: "Api Fetcher",
                      value: PipelineStepType.API_FETCHER,
                    },
                    {
                      label: "Custom Python",
                      value: PipelineStepType.CUSTOM_PYTHON,
                    },
                    {
                      label: "Fibo Mapper",
                      value: PipelineStepType.FIBO_MAPPER,
                    },
                    {
                      label: "File Reader",
                      value: PipelineStepType.FILE_READER,
                    },
                    {
                      label: "Knowledge Graph Writer",
                      value: PipelineStepType.KNOWLEDGE_GRAPH_WRITER,
                    },
                    {
                      label: "LLM Entity Extractor",
                      value: PipelineStepType.LLM_ENTITY_EXTRACTOR,
                    },
                    {
                      label: "Text Extractor",
                      value: PipelineStepType.TEXT_EXTRACTOR,
                    },
                    {
                      label: "Entity Resolution",
                      value: PipelineStepType.ENTITY_RESOLUTION,
                    },
                    {
                      label: "Database Extractor",
                      value: PipelineStepType.DATABASE_EXTRACTOR,
                    },
                  ],
                  required: true,
                },
                {
                  label: "Configuration",
                  name: "config",
                  type: "object",
                  placeholder: "Enter step configuration in JSON format",
                  fields: getPipelineStepConfig(
                    formData?.steps as PipelineStepType,
                  ),
                },
                {
                  label: "Description",
                  name: "description",
                  type: "textarea",
                  placeholder: "Enter step description",
                },
              ],
            },
          ]}
        />
      </Dialog>

      {/* Delete Pipeline Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          if (selectedPipeline) {
            setShowDeleteDialog(false);
            setNotification({
              type: "success",
              message: "Pipeline deleted successfully",
            });
          }
        }}
        title="Delete Pipeline"
        message={`Are you sure you want to delete "${selectedPipeline?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
