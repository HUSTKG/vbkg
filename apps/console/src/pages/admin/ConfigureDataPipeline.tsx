// packages/console/src/pages/admin/ConfigureDataPipeline.tsx
import {
  Button,
  Card,
  ConfirmDialog,
  DeleteDialog,
  ErrorNotification,
  OntologyGraph,
  SearchBar,
  StatisticCard,
  SuccessNotification,
  Table,
} from "@vbkg/ui";
import { useState } from "react";

interface Pipeline {
  id: string;
  name: string;
  type: "ETL" | "Processing" | "Validation";
  status: "Active" | "Paused" | "Error";
  source: string;
  target: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  performance: {
    successRate: number;
    avgProcessingTime: number;
    errorCount: number;
  };
}

export default function ConfigureDataPipeline() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "Main ETL Pipeline",
      type: "ETL",
      status: "Active",
      source: "External API",
      target: "Knowledge Graph",
      schedule: "*/15 * * * *",
      lastRun: "2024-04-16 10:30",
      nextRun: "2024-04-16 10:45",
      performance: {
        successRate: 98.5,
        avgProcessingTime: 45,
        errorCount: 2,
      },
    },
    {
      id: "2",
      name: "Data Validation",
      type: "Validation",
      status: "Active",
      source: "Raw Data",
      target: "Validated Data",
      schedule: "0 */1 * * *",
      lastRun: "2024-04-16 10:00",
      nextRun: "2024-04-16 11:00",
      performance: {
        successRate: 99.2,
        avgProcessingTime: 30,
        errorCount: 1,
      },
    },
  ]);

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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Pipelines"
          value={pipelines.length.toString()}
          trend={{
            value: pipelines.length,
            isPositive: pipelines.length > 0,
          }}
        />
        <StatisticCard
          title="Active Pipelines"
          value={pipelines
            .filter((p) => p.status === "Active")
            .length.toString()}
          trend={{
            value: pipelines.filter((p) => p.status === "Active").length,
            isPositive:
              pipelines.filter((p) => p.status === "Active").length > 0,
          }}
        />
        <StatisticCard
          title="Average Success Rate"
          value={`${(pipelines.reduce((acc, p) => acc + p.performance.successRate, 0) / pipelines.length).toFixed(1)}%`}
          trend={{
            value:
              pipelines.reduce((acc, p) => acc + p.performance.successRate, 0) /
              pipelines.length,
            isPositive:
              pipelines.reduce((acc, p) => acc + p.performance.successRate, 0) /
                pipelines.length >
              95,
          }}
        />
        <StatisticCard
          title="Total Errors (24h)"
          value={pipelines
            .reduce((acc, p) => acc + p.performance.errorCount, 0)
            .toString()}
          trend={{
            value: pipelines.reduce(
              (acc, p) => acc + p.performance.errorCount,
              0,
            ),
            isPositive:
              pipelines.reduce((acc, p) => acc + p.performance.errorCount, 0) <
              5,
          }}
        />
      </div>

      {/* Pipeline Flow Visualization */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Pipeline Flow</h2>
        <div className="h-[300px]">
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

      {/* Pipeline List */}
      <Card className="p-4">
        <div className="mb-4">
          <SearchBar
            onSearch={(query) => console.log("Search:", query)}
            placeholder="Search pipelines..."
          />
        </div>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Source → Target</th>
              <th>Schedule</th>
              <th>Last Run</th>
              <th>Performance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((pipeline) => (
              <tr key={pipeline.id}>
                <td>{pipeline.name}</td>
                <td>{pipeline.type}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      pipeline.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : pipeline.status === "Paused"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pipeline.status}
                  </span>
                </td>
                <td>
                  {pipeline.source} → {pipeline.target}
                </td>
                <td>{pipeline.schedule}</td>
                <td>{pipeline.lastRun}</td>
                <td>
                  <div className="text-xs">
                    <div>Success: {pipeline.performance.successRate}%</div>
                    <div>
                      Avg Time: {pipeline.performance.avgProcessingTime}s
                    </div>
                    <div>Errors: {pipeline.performance.errorCount}</div>
                  </div>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Run now:", pipeline.id)}
                    >
                      Run Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Edit:", pipeline.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedPipeline(pipeline);
                        setShowDeleteDialog(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Create Pipeline Dialog */}
      <ConfirmDialog
        isOpen={showAddDialog}
        onCancel={() => setShowAddDialog(false)}
        onConfirm={() => {
          setShowAddDialog(false);
          setNotification({
            type: "success",
            message: "Pipeline created successfully",
          });
        }}
        title="Create New Pipeline"
        message="Please provide the details of the new pipeline."
      />

      {/* Delete Pipeline Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          if (selectedPipeline) {
            setPipelines(pipelines.filter((p) => p.id !== selectedPipeline.id));
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
