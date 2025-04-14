// pages/user/CustomVisualization.tsx
import {
  AppLayout,
  Button,
  Card,
  ConfirmDialog,
  DeleteDialog,
  EmptyState,
  EntityCard,
  OntologyGraph,
  SearchBar,
} from "@vbkg/ui";
import { useState } from "react";

interface Visualization {
  id: string;
  name: string;
  type: "Graph" | "Table" | "Chart";
  created: string;
  lastModified: string;
  description: string;
  config: Record<string, any>;
}

export default function CustomVisualization() {
  const [visualizations, setVisualizations] = useState<Visualization[]>([
    {
      id: "1",
      name: "Knowledge Graph Overview",
      type: "Graph",
      created: "2024-04-01",
      lastModified: "2024-04-13",
      description: "Main knowledge graph visualization",
      config: {
        showLabels: true,
        layout: "force",
        theme: "light",
      },
    },
  ]);

  const [selectedViz, setSelectedViz] = useState<Visualization | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleCreateVisualization = () => {
    const newViz = {
      id: String(visualizations.length + 1),
      name: "New Visualization",
      type: "Graph" as const,
      created: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      description: "New visualization description",
      config: {
        showLabels: true,
        layout: "force",
        theme: "light",
      },
    };

    setVisualizations((prev) => [...prev, newViz]);
    setShowCreateDialog(false);
  };

  const handleDelete = () => {
    if (selectedViz) {
      setVisualizations((prev) => prev.filter((v) => v.id !== selectedViz.id));
      setShowDeleteDialog(false);
      setSelectedViz(null);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Custom Visualizations</h1>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? "Exit Preview" : "Preview Mode"}
            </Button>
            <Button onClick={() => setShowCreateDialog(true)}>
              Create Visualization
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <SearchBar
              onSearch={(query) => console.log("Search:", query)}
              placeholder="Search visualizations..."
            />
          </div>

          {visualizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visualizations.map((viz) => (
                <EntityCard
                  key={viz.id}
                  name={viz.name}
                  id={viz.id}
                  type={viz.type}
                  properties={[
                    { key: "Type", value: viz.type },
                    { key: "Created", value: viz.created },
                    { key: "Last Modified", value: viz.lastModified },
                    { key: "Description", value: viz.description },
                  ]}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="error"
              title="No Visualizations"
              description="Create your first visualization to get started"
            />
          )}
        </Card>

        {/* Preview Mode */}
        {previewMode && selectedViz && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Preview: {selectedViz.name}
            </h2>
            <div className="h-[500px] border rounded-lg">
              <OntologyGraph
                classes={[
                  { id: "1", name: "Entity1" },
                  { id: "2", name: "Entity2" },
                ]}
                relations={[
                  { source: "1", target: "2", name: "relates to", id: "1" },
                ]}
              />
            </div>
          </Card>
        )}

        {/* Create Visualization Dialog */}
        <ConfirmDialog
          isOpen={showCreateDialog}
          onCancel={() => setShowCreateDialog(false)}
          message="Please fill in the details to create a new visualization."
          onConfirm={handleCreateVisualization}
          title="Create New Visualization"
        />

        {/* Delete Dialog */}
        <DeleteDialog
          isOpen={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
          title="Delete Visualization"
          message={`Are you sure you want to delete "${selectedViz?.name}"?`}
        />
      </div>
    </AppLayout>
  );
}
