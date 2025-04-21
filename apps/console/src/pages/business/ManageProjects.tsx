// packages/console/src/pages/business/ManageProjects.tsx
import { useState } from "react";
import {
  Card,
  Button,
  SearchBar,
  EntityCard,
  DeleteDialog,
  ConfirmDialog,
  EmptyState,
  SuccessNotification,
  ErrorNotification,
} from "@vbkg/ui";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived";
  createdAt: string;
  lastUpdated: string;
  members: number;
  entities: number;
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Knowledge Base Alpha",
      description: "Main knowledge graph for product data",
      status: "active",
      createdAt: "2024-03-01",
      lastUpdated: "2024-04-14",
      members: 5,
      entities: 1500,
    },
    {
      id: "2",
      name: "Research Analytics",
      description: "Research papers and publications analysis",
      status: "active",
      createdAt: "2024-02-15",
      lastUpdated: "2024-04-13",
      members: 3,
      entities: 2300,
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleCreateProject = () => {
    // Implementation for creating new project
    setShowCreateDialog(false);
    setNotification({
      type: "success",
      message: "Project created successfully",
    });
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      setProjects(projects.filter((p) => p.id !== selectedProject.id));
      setShowDeleteDialog(false);
      setSelectedProject(null);
      setNotification({
        type: "success",
        message: "Project deleted successfully",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          Create New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={(query) => console.log("Search:", query)}
              placeholder="Search projects..."
            />
          </div>
          <select className="border rounded-md px-3 py-2">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </Card>

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

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <EntityCard
              key={project.id}
              name={project.name}
              properties={[
                { key: "Status", value: project.status },
                { key: "Members", value: project.members.toString() },
                { key: "Entities", value: project.entities.toString() },
                { key: "Created", value: project.createdAt },
                { key: "Last Updated", value: project.lastUpdated },
              ]}
              id={project.id}
              type="project"
              description={project.description}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Projects Found"
          description="Create your first project to get started"
        />
      )}

      {/* Create Project Dialog */}
      <ConfirmDialog
        isOpen={showCreateDialog}
        message="Fill in the details to create a new project."
        onConfirm={handleCreateProject}
        onCancel={() => setShowCreateDialog(false)}
        title="Create New Project"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
