import { PipelineStep, PipelineStepType } from "@vbkg/types";
import { Dialog } from "@vbkg/ui";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Get description for step type
function getStepTypeDescription(stepType: PipelineStepType): string {
  switch (stepType) {
    case PipelineStepType.FILE_READER:
      return "Reads data from files in storage.";
    case PipelineStepType.API_FETCHER:
      return "Fetches data from REST APIs.";
    case PipelineStepType.DATABASE_EXTRACTOR:
      return "Extracts data from databases using SQL queries.";
    case PipelineStepType.TEXT_EXTRACTOR:
      return "Extracts and processes text from documents.";
    case PipelineStepType.LLM_ENTITY_EXTRACTOR:
      return "Uses large language models to extract entities from text.";
    case PipelineStepType.FIBO_MAPPER:
      return "Maps data to FIBO (Financial Industry Business Ontology) standards.";
    case PipelineStepType.ENTITY_RESOLUTION:
      return "Resolves and deduplicates entities across data sources.";
    case PipelineStepType.KNOWLEDGE_GRAPH_WRITER:
      return "Writes processed data to a knowledge graph.";
    case PipelineStepType.CUSTOM_PYTHON:
      return "Executes custom Python code for data processing.";
    default:
      return "Custom step type.";
  }
}

// Step type options for select field
const stepTypeOptions = [
  { label: "File Reader", value: PipelineStepType.FILE_READER },
  { label: "API Fetcher", value: PipelineStepType.API_FETCHER },
  { label: "Database Extractor", value: PipelineStepType.DATABASE_EXTRACTOR },
  { label: "Text Extractor", value: PipelineStepType.TEXT_EXTRACTOR },
  {
    label: "LLM Entity Extractor",
    value: PipelineStepType.LLM_ENTITY_EXTRACTOR,
  },
  { label: "FIBO Mapper", value: PipelineStepType.FIBO_MAPPER },
  { label: "Entity Resolution", value: PipelineStepType.ENTITY_RESOLUTION },
  {
    label: "Knowledge Graph Writer",
    value: PipelineStepType.KNOWLEDGE_GRAPH_WRITER,
  },
  { label: "Custom Python", value: PipelineStepType.CUSTOM_PYTHON },
];

// Add new step dialog component
export const AddStepDialog = ({
  isOpen,
  onClose,
  onAdd,
  existingStepIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (step: PipelineStep) => void;
  existingStepIds: string[];
}) => {
  const [stepType, setStepType] = useState<PipelineStepType>(
    PipelineStepType.CUSTOM_PYTHON,
  );
  const [stepName, setStepName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Reset form when dialog opens
      setStepType(PipelineStepType.CUSTOM_PYTHON);
      setStepName("");
      setError("");
    }
  }, [isOpen]);

  const handleAdd = () => {
    if (!stepName.trim()) {
      setError("Step name is required");
      return;
    }

    // Generate default config based on step type
    let defaultConfig: any = {};

    // Create new step
    const newStep: PipelineStep = {
      id: uuidv4(),
      name: stepName.trim(),
      step_type: stepType,
      config: defaultConfig,
      enabled: true,
    };

    onAdd(newStep);
    onClose();
  };

  return (
    <Dialog
      title="Add Pipeline Step"
      description="Create a new step for your pipeline."
      primaryActionText="Add Step"
      onPrimaryAction={handleAdd}
      cancelText="Cancel"
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Step Type</label>
          <select
            className="w-full rounded-md border border-input px-3 py-2"
            value={stepType}
            onChange={(e) => setStepType(e.target.value as PipelineStepType)}
          >
            {stepTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted-foreground">
            {getStepTypeDescription(stepType)}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Step Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-input px-3 py-2"
            value={stepName}
            onChange={(e) => setStepName(e.target.value)}
            placeholder="Enter a name for this step"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </Dialog>
  );
};
