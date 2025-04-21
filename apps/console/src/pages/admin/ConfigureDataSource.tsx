// packages/console/src/pages/admin/ConfigureDataSource.tsx
import { useState } from "react";
import {
  Card,
  Button,
  Table,
  SearchBar,
  StatisticCard,
  EntityCard,
  DeleteDialog,
  ConfirmDialog,
  SuccessNotification,
  ErrorNotification,
} from "@vbkg/ui";

interface DataSource {
  id: string;
  name: string;
  type: "REST API" | "Database" | "File System";
  status: "Active" | "Inactive" | "Error";
  connString: string;
  lastSync: string;
  nextSync: string;
  organization: string;
  metrics: {
    entitiesCount: number;
    syncSuccess: number;
    avgResponseTime: number;
  };
}

export default function ConfigureDataSource() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Product Database",
      type: "Database",
      status: "Active",
      connString: "postgresql://localhost:5432/products",
      lastSync: "2024-04-16 10:30",
      nextSync: "2024-04-16 11:30",
      organization: "Company A",
      metrics: {
        entitiesCount: 15000,
        syncSuccess: 99.5,
        avgResponseTime: 120,
      },
    },
    {
      id: "2",
      name: "External API",
      type: "REST API",
      status: "Active",
      connString: "https://api.external.com/v1",
      lastSync: "2024-04-16 10:15",
      nextSync: "2024-04-16 11:15",
      organization: "Company B",
      metrics: {
        entitiesCount: 8000,
        syncSuccess: 98.2,
        avgResponseTime: 250,
      },
    },
  ]);

  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleTestConnection = () => {
    setShowTestDialog(false);
    setNotification({
      type: "success",
      message: "Connection test successful",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Sources</h1>
        <Button onClick={() => setShowAddDialog(true)}>Add Data Source</Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Sources"
          value={dataSources.length.toString()}
          trend={{
            value: dataSources.length,
            isPositive: dataSources.length > 0,
          }}
        />
        <StatisticCard
          title="Active Sources"
          value={dataSources
            .filter((s) => s.status === "Active")
            .length.toString()}
          trend={{
            value: dataSources.filter((s) => s.status === "Active").length,
            isPositive:
              dataSources.filter((s) => s.status === "Active").length > 0,
          }}
        />
        <StatisticCard
          title="Total Entities"
          value={dataSources
            .reduce((acc, s) => acc + s.metrics.entitiesCount, 0)
            .toLocaleString()}
          trend={{
            value: dataSources.reduce(
              (acc, s) => acc + s.metrics.entitiesCount,
              0,
            ),
            isPositive:
              dataSources.reduce((acc, s) => acc + s.metrics.entitiesCount, 0) >
              0,
          }}
        />
        <StatisticCard
          title="Avg Sync Success"
          value={`${(dataSources.reduce((acc, s) => acc + s.metrics.syncSuccess, 0) / dataSources.length).toFixed(1)}%`}
          trend={{
            value:
              dataSources.reduce((acc, s) => acc + s.metrics.syncSuccess, 0) /
              dataSources.length,
            isPositive:
              dataSources.reduce((acc, s) => acc + s.metrics.syncSuccess, 0) /
                dataSources.length >
              95,
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

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.map((source) => (
          <EntityCard
            key={source.id}
            id={source.id}
            type="data-source"
            name={source.name}
            properties={[
              { key: "Type", value: source.type },
              { key: "Status", value: source.status },
              { key: "Organization", value: source.organization },
              { key: "Last Sync", value: source.lastSync },
              {
                key: "Entities",
                value: source.metrics.entitiesCount.toLocaleString(),
              },
              {
                key: "Success Rate",
                value: `${source.metrics.syncSuccess}%`,
              },
            ]}
          />
        ))}
      </div>

      {/* Data Sources Table */}
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
              <th>Status</th>
              <th>Organization</th>
              <th>Last Sync</th>
              <th>Next Sync</th>
              <th>Metrics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataSources.map((source) => (
              <tr key={source.id}>
                <td>{source.name}</td>
                <td>{source.type}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      source.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : source.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {source.status}
                  </span>
                </td>
                <td>{source.organization}</td>
                <td>{source.lastSync}</td>
                <td>{source.nextSync}</td>
                <td>
                  <div className="text-xs">
                    <div>
                      Entities: {source.metrics.entitiesCount.toLocaleString()}
                    </div>
                    <div>Success: {source.metrics.syncSuccess}%</div>
                    <div>Avg Time: {source.metrics.avgResponseTime}ms</div>
                  </div>
                </td>
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
        message="Please fill in the details to add a new data source."
        isOpen={showAddDialog}
        onCancel={() => setShowAddDialog(false)}
        onConfirm={() => {
          setShowAddDialog(false);
          setNotification({
            type: "success",
            message: "Data source added successfully",
          });
        }}
        title="Add Data Source"
      />

      {/* Test Connection Dialog */}
      <ConfirmDialog
        message="Testing connection to the data source..."
        isOpen={showTestDialog}
        onCancel={() => setShowTestDialog(false)}
        onConfirm={handleTestConnection}
        title="Test Connection"
      />

      {/* Delete Data Source Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          if (selectedSource) {
            setDataSources((prev) =>
              prev.filter((s) => s.id !== selectedSource.id),
            );
            setShowDeleteDialog(false);
            setNotification({
              type: "success",
              message: "Data source deleted successfully",
            });
          }
        }}
        title="Delete Data Source"
        message={`Are you sure you want to delete "${selectedSource?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
