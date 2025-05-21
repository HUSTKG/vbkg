import { useState, useEffect } from "react";
import * as z from "zod";
import {
  Plus,
  Trash2,
  Edit,
  ShieldAlert,
  AlertCircle,
  FileSearch,
} from "lucide-react";
import {
  AppForm,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  DataTable,
  Dialog,
  FieldConfig,
  ScrollArea,
  SimpleColumnDef,
  toast,
} from "@vbkg/ui";
import { useNavigate } from "react-router";

// Types
interface Permission {
  id: number;
  name: string;
  description?: string;
  category: string;
  created_at: Date;
  updated_at?: Date;
}

interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  created_at: Date;
}

// Mock data
const mockPermissions: Permission[] = [
  // Data permissions
  {
    id: 1,
    name: "data:read",
    description: "Read data from the system",
    category: "Data",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "data:write",
    description: "Create and modify data",
    category: "Data",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "data:delete",
    description: "Delete data from the system",
    category: "Data",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "data:admin",
    description: "Administer data settings",
    category: "Data",
    created_at: new Date("2024-01-01"),
  },

  // Pipeline permissions
  {
    id: 5,
    name: "pipelines:read",
    description: "View pipelines",
    category: "Pipelines",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 6,
    name: "pipelines:write",
    description: "Create and modify pipelines",
    category: "Pipelines",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 7,
    name: "pipelines:delete",
    description: "Delete pipelines",
    category: "Pipelines",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 8,
    name: "pipelines:execute",
    description: "Execute pipelines",
    category: "Pipelines",
    created_at: new Date("2024-01-01"),
  },

  // Analytics permissions
  {
    id: 9,
    name: "analytics:read",
    description: "View analytics dashboards",
    category: "Analytics",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 10,
    name: "analytics:write",
    description: "Create and modify analytics",
    category: "Analytics",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 11,
    name: "analytics:share",
    description: "Share analytics with others",
    category: "Analytics",
    created_at: new Date("2024-01-01"),
  },

  // User permissions
  {
    id: 12,
    name: "users:read",
    description: "View user information",
    category: "Users",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 13,
    name: "users:write",
    description: "Create and modify users",
    category: "Users",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 14,
    name: "users:delete",
    description: "Delete users",
    category: "Users",
    created_at: new Date("2024-01-01"),
  },

  // Admin permissions
  {
    id: 15,
    name: "settings:read",
    description: "View system settings",
    category: "Settings",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 16,
    name: "settings:write",
    description: "Modify system settings",
    category: "Settings",
    created_at: new Date("2024-01-01"),
  },

  // All access
  {
    id: 17,
    name: "all:read",
    description: "Read access to all resources",
    category: "All",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 18,
    name: "all:write",
    description: "Write access to all resources",
    category: "All",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 19,
    name: "all:delete",
    description: "Delete access to all resources",
    category: "All",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 20,
    name: "all:admin",
    description: "Administrative access to all resources",
    category: "All",
    created_at: new Date("2024-01-01"),
  },
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    created_at: new Date("2024-01-01"),
    permissions: ["all:read", "all:write", "all:delete", "all:admin"],
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    created_at: new Date("2024-01-01"),
    permissions: [
      "pipelines:read",
      "pipelines:write",
      "data:read",
      "data:write",
    ],
  },
  {
    id: 3,
    name: "analyst",
    description: "Access to data and analytics",
    created_at: new Date("2024-01-01"),
    permissions: ["data:read", "analytics:read", "analytics:write"],
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    created_at: new Date("2024-01-01"),
    permissions: ["data:read", "pipelines:read", "analytics:read"],
  },
];

// Mock API functions
const fetchPermissions = async (): Promise<Permission[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPermissions);
    }, 500);
  });
};

const fetchRoles = async (): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles);
    }, 500);
  });
};

// Get roles with a specific permission
const fetchRolesWithPermission = async (
  permissionName: string,
): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const roles = mockRoles.filter((role) =>
        role.permissions.includes(permissionName),
      );
      resolve(roles);
    }, 500);
  });
};

// Permission schema
const permissionSchema = z.object({
  name: z.string().min(1, "Permission name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

// Create/Edit Permission dialog
const PermissionDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof permissionSchema>) => void;
  initialData?: Permission;
  categories: string[];
}) => {
  const isEditMode = !!initialData;

  // Form fields
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Permission Name",
      type: "text",
      required: true,
      placeholder: "resource:action",
      description: "Format should be resource:action (e.g., users:read)",
      disabled: isEditMode, // Can't change name after creation
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      placeholder: "Enter a description",
      description: "Clear description of what this permission allows",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: categories.map((cat) => ({ label: cat, value: cat })),
      placeholder: "Select category",
      description: "Group related permissions together",
    },
  ];

  return (
    <Dialog
      title="Permission Dialog"
      description={
        isEditMode
          ? "Edit the details of this permission."
          : "Create a new permission in the system."
      }
      open={isOpen}
      onOpenChange={onClose}
    >
      <AppForm
        fields={fields}
        schema={permissionSchema}
        onSubmit={onSubmit}
        defaultValues={
          initialData
            ? {
                name: initialData.name,
                description: initialData.description || "",
                category: initialData.category,
              }
            : undefined
        }
        submitButtonText={isEditMode ? "Save Changes" : "Create Permission"}
        resetButton={true}
        buttons={
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Create Permission"}
            </Button>
          </div>
        }
      />
    </Dialog>
  );
};

// Delete confirmation dialog
const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "permission",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}) => {
  return (
    <ConfirmDialog
      title={`Delete ${itemType}`}
      message={`Are you sure you want to delete the ${itemType} "${itemName}"? This action cannot be undone.`}
      onConfirm={onConfirm}
      onCancel={onClose}
      isOpen={isOpen}
    />
  );
};

// View Roles dialog
const ViewRolesDialog = ({
  isOpen,
  onClose,
  permission,
  roles,
}: {
  isOpen: boolean;
  onClose: () => void;
  permission: Permission | null;
  roles: Role[];
}) => {
  if (!permission) return null;

  return (
    <Dialog
      title={`Roles with "${permission.name}" Permission`}
      description="The following roles have been granted this permission."
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="py-4">
        {roles.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No roles have been assigned this permission.
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {roles.map((role) => (
                <div key={role.id} className="border rounded-md p-3">
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </Dialog>
  );
};

export default function PermissionsPage() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRolesDialog, setShowRolesDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [rolesWithPermission, setRolesWithPermission] = useState<Role[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const permissionsData = await fetchPermissions();
        setPermissions(permissionsData);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(permissionsData.map((p) => p.category)),
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to load permissions:", error);
        toast("Error", {
          description: "Failed to load permissions. Please try again.",
          className: "bg-red-500 text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreatePermission = async (
    data: z.infer<typeof permissionSchema>,
  ) => {
    try {
      // Check for duplicate
      const exists = permissions.some((p) => p.name === data.name);
      if (exists) {
        toast("Error", {
          description: "A permission with this name already exists.",
          className: "bg-red-500 text-white",
        });
        return;
      }

      // In a real app, make API call to create permission
      const newPermission: Permission = {
        id: Math.floor(Math.random() * 1000) + 100, // Mock ID generation
        name: data.name,
        description: data.description,
        category: data.category,
        created_at: new Date(),
        updated_at: new Date(),
      };

      setPermissions((prev) => [...prev, newPermission]);

      // Update categories if needed
      if (!categories.includes(data.category)) {
        setCategories((prev) => [...prev, data.category]);
      }

      setShowAddDialog(false);

      toast("Success", {
        description: `Permission "${data.name}" created successfully.`,
      });
    } catch (error) {
      console.error("Failed to create permission:", error);
      toast("Error", {
        description: "Failed to create permission. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleEditPermission = async (
    data: z.infer<typeof permissionSchema>,
  ) => {
    if (!selectedPermission) return;

    try {
      // In a real app, make API call to update permission
      const updatedPermissions = permissions.map((p) => {
        if (p.id === selectedPermission.id) {
          return {
            ...p,
            description: data.description,
            category: data.category,
            updated_at: new Date(),
          };
        }
        return p;
      });

      setPermissions(updatedPermissions);
      setShowEditDialog(false);

      toast("Success", {
        description: "Permission updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update permission:", error);
      toast({
        title: "Error",
        description: "Failed to update permission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePermission = async () => {
    if (!selectedPermission) return;

    try {
      // In a real app, make API call to delete permission
      const updatedPermissions = permissions.filter(
        (p) => p.id !== selectedPermission.id,
      );

      setPermissions(updatedPermissions);
      setShowDeleteDialog(false);
      setSelectedPermission(null);

      toast("Success", {
        description: `Permission "${selectedPermission.name}" deleted successfully.`,
      });
    } catch (error) {
      console.error("Failed to delete permission:", error);
      toast("Error", {
        description: "Failed to delete permission. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleViewRoles = async (permission: Permission) => {
    try {
      setSelectedPermission(permission);
      const roles = await fetchRolesWithPermission(permission.name);
      setRolesWithPermission(roles);
      setShowRolesDialog(true);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      toast("Error", {
        description: "Failed to load roles. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // Table columns
  const columns: SimpleColumnDef<Permission, any>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row) => (
        <div className="font-medium font-mono text-sm">{row?.name}</div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row) => <div>{row?.description}</div>,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (row) => <Badge variant="outline">{row?.category}</Badge>,
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: (row) => (
        <div className="text-sm">
          {row?.created_at
            ? new Date(row.created_at).toLocaleDateString()
            : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <ShieldAlert className="mr-2 h-7 w-7" />
            Permissions Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage the permissions that can be assigned to roles.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Permission
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>System Permissions</CardTitle>
          <CardDescription>
            These permissions control access to various features and operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <DataTable<Permission, any>
              data={permissions}
              columns={columns}
              showGlobalFilter={true}
              showColumnFilters={true}
              showPagination={true}
              actionsOptions={{
                show: true,
                position: "end",
                actions: [
                  {
                    label: "View Roles",
                    icon: <FileSearch className="h-4 w-4" />,
                    onClick: handleViewRoles,
                    variant: "ghost",
                  },
                  {
                    label: "Edit",
                    icon: <Edit className="h-4 w-4" />,
                    onClick: (permission) => {
                      setSelectedPermission(permission);
                      setShowEditDialog(true);
                    },
                    variant: "outline",
                  },
                  {
                    label: "Delete",
                    icon: <Trash2 className="h-4 w-4" />,
                    onClick: (permission) => {
                      setSelectedPermission(permission);
                      setShowDeleteDialog(true);
                    },
                    variant: "outline",
                    className: "text-red-600 hover:text-red-700",
                  },
                ],
                showInDropdown: true,
                dropdownLabel: "Actions",
              }}
            />
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <AlertCircle className="inline-block h-4 w-4 mr-1" />
            Permissions should follow the format{" "}
            <span className="font-mono">resource:action</span>, like{" "}
            <span className="font-mono">users:read</span> or{" "}
            <span className="font-mono">pipelines:write</span>.
          </div>
        </CardFooter>
      </Card>

      {/* Create Permission Dialog */}
      <PermissionDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSubmit={handleCreatePermission}
        categories={categories}
      />

      {/* Edit Permission Dialog */}
      {selectedPermission && (
        <PermissionDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSubmit={handleEditPermission}
          initialData={selectedPermission}
          categories={categories}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeletePermission}
        itemName={selectedPermission?.name || ""}
        itemType="permission"
      />

      {/* View Roles Dialog */}
      <ViewRolesDialog
        isOpen={showRolesDialog}
        onClose={() => setShowRolesDialog(false)}
        permission={selectedPermission}
        roles={rolesWithPermission}
      />
    </div>
  );
}
