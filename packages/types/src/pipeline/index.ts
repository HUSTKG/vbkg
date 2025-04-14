export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  steps: PipelineStep[];
  status: "active" | "inactive" | "error";
  schedule?: string; // Cron expression
  lastRun?: Date;
  error?: string;
}

export interface PipelineStep {
  id: string;
  type: "extract" | "transform" | "load" | "validate" | "enrich";
  config: Record<string, unknown>;
  dependsOn: string[]; // IDs of steps this step depends on
  status: "pending" | "running" | "completed" | "error";
  error?: string;
}
