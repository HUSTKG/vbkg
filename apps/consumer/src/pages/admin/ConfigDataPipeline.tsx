import {
  AppLayout,
  Button,
  Card,
  ConfirmDialog,
  DeleteDialog,
  OntologyGraph,
  ResultCard,
  StatisticCard,
} from "@vbkg/ui";
import { useState } from "react";

interface Pipeline {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Error";
  type: "ETL" | "Processing" | "Validation";
  lastRun: string;
  nextRun: string;
  source: string;
  target: string;
}

export default function ConfigureDataPipeline() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "Main ETL Pipeline",
      status: "Active",
      type: "ETL",
      lastRun: "2024-04-13 10:30",
      nextRun: "2024-04-13 11:30",
      source: "REST API",
      target: "Knowledge Graph",
    },
  ]);

  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(
    null,
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Data Pipeline Configuration</h1>
          <Button onClick={() => setShowAddDialog(true)}>
            Add New Pipeline
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatisticCard
            title="Total Data Sources"
            value={pipelines.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <StatisticCard
            title="Total Data Sources"
            value={pipelines.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <StatisticCard
            title="Total Data Sources"
            value={pipelines.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <StatisticCard
            title="Total Data Sources"
            value={pipelines.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
        </div>

        {/* Pipeline Flow Visualization */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Pipeline Flow</h2>
          <OntologyGraph
            classes={[
              { id: "source", name: "Data Sources" },
              { id: "transform", name: "Transformations" },
              { id: "target", name: "Knowledge Graph" },
            ]}
            relations={[
              {
                source: "source",
                target: "transform",
                name: "Extract",
                id: "extract",
              },
              {
                source: "transform",
                target: "target",
                name: "Load",
                id: "load",
              },
            ]}
          />
        </Card>

        {/* Pipelines List */}
        <div className="space-y-4">
          {pipelines.map((pipeline) => (
            <ResultCard
              key={pipeline.id}
              name={pipeline.name}
              type={pipeline.type}
              id={pipeline.id}
              properties={[
                { label: "Status", value: pipeline.status },
                { label: "Type", value: pipeline.type },
                { label: "Last Run", value: pipeline.lastRun },
                { label: "Next Run", value: pipeline.nextRun },
                { label: "Source", value: pipeline.source },
                { label: "Target", value: pipeline.target },
              ]}
            />
          ))}
        </div>

        {/* Add New Pipeline Dialog */}
        <ConfirmDialog
          isOpen={showAddDialog}
          onCancel={() => setShowAddDialog(false)}
          message="Please fill in the details to add a new pipeline."
          onConfirm={() => {
            // Handle add
            setShowAddDialog(false);
          }}
          title="Add New Pipeline"
        />

        {/* Delete Confirmation */}
        <DeleteDialog
          isOpen={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            if (selectedPipeline) {
              setPipelines((prev) =>
                prev.filter((p) => p.id !== selectedPipeline.id),
              );
              setShowDeleteDialog(false);
            }
          }}
          title="Delete Pipeline"
          message={`Are you sure you want to delete ${selectedPipeline?.name}?`}
        />
      </div>
    </AppLayout>
  );
}
