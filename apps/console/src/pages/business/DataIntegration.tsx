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

interface DataSource {
  id: string;
  name: string;
  type: "API" | "Database" | "File";
  status: "Active" | "Inactive" | "Error";
  lastSync: string;
  nextSync: string;
  entitiesCount: number;
  project: string;
}

export default function DataIntegration() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Product Database",
      type: "Database",
      status: "Active",
      lastSync: "2024-04-14 10:30",
      nextSync: "2024-04-14 16:30",
      entitiesCount: 1500,
      project: "Project A",
    },
    {
      id: "2",
      name: "External API",
      type: "API",
      status: "Active",
      lastSync: "2024-04-14 09:15",
      nextSync: "2024-04-14 15:15",
      entitiesCount: 2300,
      project: "Project B",
    },
  ]);

  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleAddSource = () => {
    setShowAddDialog(false);
    setNotification({
      type: "success",
      message: "Data source added successfully",
    });
  };

  const handleDeleteSource = () => {
    if (selectedSource) {
      setDataSources((prev) => prev.filter((s) => s.id !== selectedSource.id));
      setShowDeleteDialog(false);
      setSelectedSource(null);
      setNotification({
        type: "success",
        message: "Data source deleted successfully",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Integration</h1>
        <Button onClick={() => setShowAddDialog(true)}>Add Data Source</Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Sources"
          value={dataSources.length}
          trend={{
            value: 5,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Active Sources"
          value={dataSources.filter((s) => s.status === "Active").length}
          trend={{
            value: 3,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Total Entities"
          value={dataSources.reduce((acc, curr) => acc + curr.entitiesCount, 0)}
          trend={{
            value: 5000,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Sync Success Rate"
          value="98%"
          trend={{
            value: 2,
            isPositive: true,
          }}
        />
      </div>

      {/* Notifications */}
      {notification &&
        (notification.type === "success" ? (
          <SuccessNotification
            title="Success"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ) : (
          <ErrorNotification
            title="Error"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ))}

      {/* Data Flow Visualization */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Data Flow Overview</h2>
        <div className="h-[300px]">
          <OntologyGraph
            classes={[
              { id: "sources", name: "Data Sources" },
              { id: "transform", name: "Transformation" },
              { id: "storage", name: "Knowledge Graph" },
            ]}
            relations={[
              {
                source: "sources",
                target: "transform",
                name: "Extract",
                id: "1",
              },
              { source: "transform", target: "storage", name: "Load", id: "2" },
            ]}
          />
        </div>
      </Card>

      {/* Data Sources List */}
      <Card className="p-4">
        <div className="mb-4">
          <SearchBar
            onSearch={(query) => console.log("Search:", query)}
            placeholder="Search data sources..."
          />
        </div>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Project</th>
              <th>Status</th>
              <th>Last Sync</th>
              <th>Next Sync</th>
              <th>Entities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataSources.map((source) => (
              <tr key={source.id}>
                <td>{source.name}</td>
                <td>{source.type}</td>
                <td>{source.project}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      source.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : source.status === "Error"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {source.status}
                  </span>
                </td>
                <td>{source.lastSync}</td>
                <td>{source.nextSync}</td>
                <td>{source.entitiesCount.toLocaleString()}</td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Sync now:", source.id)}
                    >
                      Sync Now
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedSource(source);
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

      {/* Add Data Source Dialog */}
      <ConfirmDialog
        isOpen={showAddDialog}
        onCancel={() => setShowAddDialog(false)}
        onConfirm={handleAddSource}
        title="Add Data Source"
        message="Please provide the details of the new data source."
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteSource}
        title="Delete Data Source"
        message={`Are you sure you want to delete "${selectedSource?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
