import {
    AppLayout,
    Button,
    ConfirmDialog,
    DeleteDialog,
    EntityCard,
    StatisticCard
} from "@vbkg/ui";
import { useState } from "react";

interface DataSource {
  id: string;
  name: string;
  type: "REST API" | "Database" | "File System";
  status: "Active" | "Inactive";
  lastSync: string;
  url: string;
}

export default function ConfigureDataSource() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Main API",
      type: "REST API",
      status: "Active",
      lastSync: "2024-04-13 10:30",
      url: "https://api.example.com",
    },
  ]);

  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Data Sources Configuration</h1>
          <Button onClick={() => setShowAddDialog(true)}>
            Add New Data Source
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatisticCard
            title="Total Data Sources"
            value={dataSources.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <StatisticCard
            title="Total Data Sources"
            value={dataSources.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <StatisticCard
            title="Total Data Sources"
            value={dataSources.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
        </div>

        {/* Data Sources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.map((source) => (
            <EntityCard
              key={source.id}
              properties={[
                { key: "Type", value: source.type },
                { key: "Status", value: source.status },
                { key: "Last Sync", value: source.lastSync },
                { key: "URL", value: source.url },
              ]}
              name={source.name}
              id={source.id}
              type={source.type}
            />
          ))}
        </div>

        {/* Add New Data Source Dialog */}
        <ConfirmDialog
          isOpen={showAddDialog}
          onCancel={() => setShowAddDialog(false)}
          message="Please fill in the details of the new data source."
          onConfirm={() => {
            // Handle add
            setShowAddDialog(false);
          }}
          title="Add New Data Source"
        />

        {/* Delete Confirmation */}
        <DeleteDialog
          isOpen={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            if (selectedSource) {
              setDataSources((prev) =>
                prev.filter((s) => s.id !== selectedSource.id),
              );
              setShowDeleteDialog(false);
            }
          }}
          title="Delete Data Source"
          message={`Are you sure you want to delete ${selectedSource?.name}?`}
        />
      </div>
    </AppLayout>
  );
}
