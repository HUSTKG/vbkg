import { useState, useEffect } from "react";
import * as z from "zod";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Shuffle,
  FileUp,
  Database,
  Code,
  Brain,
  Network,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  Pipeline,
  PipelineStep,
  PipelineStepType,
  PipelineType,
} from "@vbkg/types";
import {
  AppForm,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@vbkg/ui";
import { useNavigate, useParams } from "react-router";
import { CreatePipelineSchema } from "@vbkg/schemas";
import {
  formCreatePipelineConfig,
  generateStepConfigFields,
} from "./components/forms/create";
import {
  useCreatePipeline,
  usePipeline,
  useUpdatePipeline,
} from "@vbkg/api-client";
import { AddStepDialog } from "./components/dialog/addPipelineStep";

// Function to get a step icon based on step type
const getStepTypeIcon = (stepType: PipelineStepType) => {
  switch (stepType) {
    case PipelineStepType.FILE_READER:
      return <FileUp className="h-5 w-5" />;
    case PipelineStepType.API_FETCHER:
      return <Globe className="h-5 w-5" />;
    case PipelineStepType.DATABASE_EXTRACTOR:
      return <Database className="h-5 w-5" />;
    case PipelineStepType.LLM_ENTITY_EXTRACTOR:
      return <Brain className="h-5 w-5" />;
    case PipelineStepType.ENTITY_RESOLUTION:
      return <Network className="h-5 w-5" />;
    case PipelineStepType.KNOWLEDGE_GRAPH_WRITER:
      return <Database className="h-5 w-5" />;
    case PipelineStepType.CUSTOM_PYTHON:
      return <Code className="h-5 w-5" />;
    default:
      return <Shuffle className="h-5 w-5" />;
  }
};

export default function PipelineEditPage() {
  const id = useParams().id;
  const isEditMode = id !== "create" && !!id;
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [formKey, setFormKey] = useState(0); // Used to force form re-render
  const [pipeline, setPipeline] = useState<Pipeline | undefined>();

  const { data: pipelineResponse, isFetching: loading } = usePipeline(
    {
      id: id as string,
    },
    {
      enabled: isEditMode && !!id,
    },
  );

  useEffect(() => {
    if (isEditMode && pipelineResponse) {
      const _pipeline = pipelineResponse.data;
      setPipeline(_pipeline);
      if (_pipeline && _pipeline.steps?.length) {
        setActiveStep(_pipeline.steps[0].id);
      }
    } else {
      setPipeline({
        id: "new",
        name: "",
        description: "",
        pipeline_type: PipelineType.EXTRACTION,
        steps: [],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }, [pipelineResponse, isEditMode]);

  const { mutate: createPipeline } = useCreatePipeline({
    onSuccess: () => {
      toast("Success", {
        description: `Pipeline created successfully.`,
      });

      navigate("/admin/data-pipelines");
    },
    onError: (error) => {
      console.error("Failed to save pipeline:", error);
      toast("Error", {
        description: `Failed to create pipeline. Please try again.`,
        className: "bg-red-500 text-white",
      });
    },
  });

  const { mutate: updatePipeline } = useUpdatePipeline({
    onSuccess: (data) => {
      toast("Success", {
        description: `Pipeline updated successfully.`,
      });
      navigate(`/admin/data-pipelines/${data.data.id}`);
    },
    onError: (error) => {
      console.error("Failed to update pipeline:", error);
      toast("Error", {
        description: `Failed to update pipeline. Please try again.`,
        className: "bg-red-500 text-white",
      });
    },
  });

  const handleBackToDetails = () => {
    if (isEditMode) {
      navigate(`/admin/data-pipelines/${id}`);
    } else {
      navigate("/admin/data-pipelines");
    }
  };

  const handleAddStep = (step: PipelineStep) => {
    if (!pipeline) return;

    const updatedPipeline = {
      ...pipeline,
      steps: [...pipeline.steps, step],
    };

    setPipeline(updatedPipeline);
    setActiveStep(step.id);
    setFormKey((prev) => prev + 1); // Force form re-render
  };

  const handleRemoveStep = (stepId: string) => {
    if (!pipeline) return;

    // Check if step is being used as input for other steps
    const isUsedAsInput = pipeline.steps.some((step) =>
      step.inputs?.includes(stepId),
    );

    if (isUsedAsInput) {
      toast("Cannot remove step", {
        description:
          "This step is used as input by other steps. Please update those steps first.",
      });
      return;
    }

    // Remove the step
    const updatedSteps = pipeline.steps.filter((step) => step.id !== stepId);

    // Update the pipeline
    const updatedPipeline = {
      ...pipeline,
      steps: updatedSteps,
    };

    setPipeline(updatedPipeline);

    // If the active step was removed, set a new active step
    if (activeStep === stepId) {
      setActiveStep(updatedSteps.length > 0 ? updatedSteps[0].id : null);
    }

    setFormKey((prev) => prev + 1); // Force form re-render
  };

  const handleStepChange = (
    stepId: string,
    updatedData: Partial<PipelineStep>,
  ) => {
    if (!pipeline) return;

    console.log(updatedData);

    // Update the step
    const updatedSteps = pipeline.steps.map((step) =>
      step.id === stepId ? { ...step, ...updatedData } : step,
    );

    // Update the pipeline
    const updatedPipeline = {
      ...pipeline,
      steps: updatedSteps,
    };

    setPipeline(updatedPipeline);
  };

  const handleSavePipeline = async (
    data: z.infer<typeof CreatePipelineSchema>,
  ) => {
    const steps =
      pipeline?.steps?.map((item, index) => ({
        ...item,
        run_order: index + 1,
      })) || [];
    if (isEditMode && id) {
      updatePipeline({
        id: id,
        ...data,
        steps: steps,
      });
    } else {
      createPipeline({
        ...data,
        steps: steps,
      });
    }
  };

  // Find active step
  const currentStep = pipeline?.steps.find((step) => step.id === activeStep);

  // Generate step configuration form fields
  // Handle step form submission
  const handleStepFormSubmit = (data: any) => {
    if (!currentStep) return;

    // Extract config from form data
    const { name, enabled, inputs, ...configData } = data;

    // Restructure config data (remove config. prefix)
    const config: Record<string, any> = configData.config;

    // Update step
    handleStepChange(currentStep.id, {
      name,
      enabled,
      inputs,
      config,
    });

    toast("Success", {
      description: "Step configuration saved successfully.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button size="sm" onClick={handleBackToDetails}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
        <Card>
          <CardContent className="py-10">
            <div className="flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button size="sm" onClick={handleBackToDetails}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h2 className="text-lg font-semibold">Pipeline Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The requested pipeline could not be found.
              </p>
              <Button className="mt-4" onClick={() => navigate("/pipelines")}>
                Return to Pipeline List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform current step for the form
  const stepFormData = currentStep
    ? {
        name: currentStep.name,
        enabled: currentStep.enabled === undefined ? true : currentStep.enabled,
        inputs: currentStep.inputs || [],
        ...Object.entries(currentStep.config || {}).reduce(
          (acc, [key, value]) => {
            acc[`config.${key}`] = value;
            return acc;
          },
          {} as Record<string, any>,
        ),
      }
    : {};

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button size="sm" onClick={handleBackToDetails}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode
            ? `Edit Pipeline: ${pipeline.name}`
            : "Create New Pipeline"}
        </h1>
        <Button
          onClick={() => document.getElementById("save-pipeline-btn")?.click()}
        >
          <Save className="mr-2 h-4 w-4" /> Save Pipeline
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Pipeline Details</TabsTrigger>
          <TabsTrigger value="steps">Pipeline Steps</TabsTrigger>
        </TabsList>

        <TabsContent
          value="details"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Details</CardTitle>
              <CardDescription>
                Configure the basic properties of your pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppForm
                key={`pipeline-form-${formKey}`}
                fields={formCreatePipelineConfig}
                schema={CreatePipelineSchema}
                onSubmit={handleSavePipeline}
                submitButtonText="Save Pipeline"
                defaultValues={{
                  name: pipeline?.name,
                  description: pipeline?.description || "",
                  pipeline_type: pipeline?.pipeline_type,
                  is_active: pipeline?.is_active,
                  schedule: pipeline?.schedule || "",
                }}
                buttons={
                  <div className="flex justify-end">
                    <Button id="save-pipeline-btn" type="submit">
                      <Save className="mr-2 h-4 w-4" /> Save Pipeline
                    </Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          className="data-[state=inactive]:hidden"
          value="steps"
          forceMount
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Steps ({pipeline.steps.length})</span>
                  <Button size="sm" onClick={() => setShowAddStepDialog(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Add Step
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pipeline.steps.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground mb-4">
                      No steps added yet
                    </p>
                    <Button onClick={() => setShowAddStepDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Add First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pipeline.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          activeStep === step.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveStep(step.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`flex items-center justify-center rounded-full w-6 h-6 bg-primary/20 text-primary mr-2`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{step.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                {getStepTypeIcon(
                                  step.step_type as PipelineStepType,
                                )}
                                <span className="ml-1">{step.step_type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!step.enabled && (
                              <Badge variant="outline" className="mr-2 text-xs">
                                Disabled
                              </Badge>
                            )}
                            <Button
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveStep(step.id);
                              }}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {step.inputs && step.inputs.length > 0 && (
                          <div className="text-xs mt-1 pl-8 text-muted-foreground">
                            Inputs:{" "}
                            {step.inputs
                              .map((inputId) => {
                                const inputStep = pipeline.steps.find(
                                  (s) => s.id === inputId,
                                );
                                return inputStep ? inputStep.name : inputId;
                              })
                              .join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {currentStep
                    ? "Configure Step: " + currentStep.name
                    : "Step Configuration"}
                </CardTitle>
                <CardDescription>
                  {currentStep
                    ? `Configure the settings for this ${currentStep.step_type} step.`
                    : "Select a step from the list to configure it."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep ? (
                  <AppForm
                    key={`step-form-${activeStep}-${formKey}`}
                    fields={generateStepConfigFields(currentStep, pipeline)}
                    schema={z.any()} // Use dynamic schema based on step type
                    onSubmit={handleStepFormSubmit}
                    defaultValues={stepFormData}
                    submitButtonText="Save Step Configuration"
                    resetButton={true}
                  />
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      {pipeline.steps.length === 0
                        ? "Add a step to get started"
                        : "Select a step to configure"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Step Dialog */}
      <AddStepDialog
        isOpen={showAddStepDialog}
        onClose={() => setShowAddStepDialog(false)}
        onAdd={handleAddStep}
        existingStepIds={pipeline.steps.map((step) => step.id)}
      />
    </div>
  );
}
