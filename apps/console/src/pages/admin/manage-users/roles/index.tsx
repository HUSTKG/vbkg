import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  Users,
  Eye,
  ShieldAlert,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  DataTable,
  Dialog,
  Input,
  Label,
  SimpleColumnDef,
  toast,
} from "@vbkg/ui";
import { useNavigate } from "react-router";

// Types
interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  users_count: number;
  created_at: Date;
  updated_at?: Date;
}

// Mock data
const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    permissions: ["all:read", "all:write", "all:delete", "all:admin"],
    users_count: 1,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    permissions: [
      "pipelines:read",
      "pipelines:write",
      "data:read",
      "data:write",
    ],
    users_count: 1,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-02-15"),
  },
  {
    id: 3,
    name: "analyst",
    description: "Access to data and analytics",
    permissions: ["data:read", "analytics:read", "analytics:write"],
    users_count: 1,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-03-10"),
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    permissions: ["data:read", "pipelines:read", "analytics:read"],
    users_count: 4,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "manager",
    description: "Management access to the system",
    permissions: ["data:read", "analytics:read", "users:read"],
    users_count: 1,
    created_at: new Date("2024-02-15"),
    updated_at: new Date("2024-02-15"),
  },
];

// Mock API functions
const fetchRoles = async (): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles);
    }, 500);
  });
};

// Create/Edit Role Dialog
const RoleDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
  initialData?: Role;
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setDescription(initialData?.description || "");
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Role name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        name: name.trim(),
        description: description.trim(),
      });
    }
  };

  return (
    <Dialog
      title={`${isEditMode ? "Edit" : "Create"} Role`}
      open={isOpen}
      primaryActionText={isEditMode ? "Update" : "Create"}
      onPrimaryAction={handleSubmit}
      onClose={onClose}
      onOpenChange={onClose}
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Role Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter role name"
            disabled={isEditMode} // Can't change name after creation
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          <p className="text-xs text-muted-foreground">
            A unique identifier for this role. Use lowercase letters and avoid
            spaces.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this role is for"
          />
          <p className="text-xs text-muted-foreground">
            A clear description of what this role allows users to do.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

// Delete confirmation dialog
const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role: Role | null;
}) => {
  if (!role) return null;

  return (
    <ConfirmDialog
      title="Delete Role"
      message={
        <div>
          Are you sure you want to delete the "{role.name}" role? This action
          cannot be undone.
          {role.users_count > 0 && (
            <div className="mt-2 text-red-500">
              Warning: This role is currently assigned to {role.users_count}{" "}
              user{role.users_count !== 1 ? "s" : ""}.
            </div>
          )}
        </div>
      }
      isOpen={isOpen}
      confirmLabel="Delete Role"
      onConfirm={onConfirm}
      onCancel={onClose}
    />
  );
};

export default function RolesListPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Failed to load roles:", error);
        toast("Error", {
          description: "Failed to load roles. Please try again.",
          className: "bg-red-500 text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateRole = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      // Check for duplicate
      const exists = roles.some((r) => r.name === data.name);
      if (exists) {
        toast("Error", {
          description: "A role with this name already exists.",
          className: "bg-red-500 text-white",
        });
        return;
      }

      // In a real app, make API call to create role
      const newRole: Role = {
        id: Math.floor(Math.random() * 1000) + 100, // Mock ID generation
        name: data.name,
        description: data.description,
        permissions: [],
        users_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };

      setRoles((prev) => [...prev, newRole]);
      setShowCreateDialog(false);

      toast("Success", {
        description: `Role "${data.name}" created successfully.`,
      });
    } catch (error) {
      console.error("Failed to create role:", error);
      toast("Error", {
        description: "Failed to create role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleUpdateRole = async (data: {
    name: string;
    description: string;
  }) => {
    if (!selectedRole) return;

    try {
      // In a real app, make API call to update role
      const updatedRoles = roles.map((r) => {
        if (r.id === selectedRole.id) {
          return {
            ...r,
            description: data.description,
            updated_at: new Date(),
          };
        }
        return r;
      });

      setRoles(updatedRoles);
      setShowEditDialog(false);

      toast("Success", {
        description: `Role "${selectedRole.name}" updated successfully.`,
      });
    } catch (error) {
      console.error("Failed to update role:", error);
      toast("Error", {
        description: "Failed to update role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;

    try {
      // In a real app, make API call to delete role
      const updatedRoles = roles.filter((r) => r.id !== selectedRole.id);

      setRoles(updatedRoles);
      setShowDeleteDialog(false);

      toast("Success", {
        description: `Role "${selectedRole.name}" deleted successfully.`,
      });
    } catch (error) {
      console.error("Failed to delete role:", error);
      toast("Error", {
        description: "Failed to delete role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // Table columns
  const columns: SimpleColumnDef<Role, any>[] = [
    {
      header: "Role Name",
      accessorKey: "name",
      cell: (row) => <div className="font-medium capitalize">{row?.name}</div>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row) => <div>{row?.description || "—"}</div>,
    },
    {
      header: "Permissions",
      accessorKey: "permissions",
      cell: (row) => (
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">
            {row?.permissions?.length || 0}
          </Badge>
          {row?.permissions && row?.permissions?.length > 0 && (
            <div className="flex flex-wrap gap-1 max-w-sm truncate">
              {row?.permissions?.slice(0, 3).map((permission: string) => (
                <Badge key={permission} variant="outline" className="text-xs">
                  {permission}
                </Badge>
              ))}
              {row?.permissions?.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{row.permissions.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Users",
      accessorKey: "users_count",
      cell: (row) => <Badge variant="outline">{row?.users_count}</Badge>,
    },
    {
      header: "Last Updated",
      accessorKey: "updated_at",
      cell: (row) => (
        <div className="text-sm">
          {row?.updated_at
            ? new Date(row.updated_at).toLocaleDateString()
            : "—"}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <ShieldCheck className="mr-2 h-7 w-7" />
            Role Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage roles and their associated permissions
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Role
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Roles define the permissions that users have in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <DataTable<Role, any>
              data={roles}
              columns={columns}
              showGlobalFilter={true}
              showColumnFilters={true}
              showPagination={true}
              actionsOptions={{
                show: true,
                position: "end",
                actions: [
                  {
                    label: "View Details",
                    icon: <Eye className="h-4 w-4" />,
                    onClick: (role) => navigate(`/roles/${role.id}`),
                    variant: "ghost",
                  },
                  {
                    label: "Manage Permissions",
                    icon: <ShieldAlert className="h-4 w-4" />,
                    onClick: (role) =>
                      navigate(`/roles/${role.id}/permissions`),
                    variant: "outline",
                  },
                  {
                    label: "Manage Users",
                    icon: <Users className="h-4 w-4" />,
                    onClick: (role) => navigate(`/roles/${role.id}/users`),
                    variant: "outline",
                  },
                  {
                    label: "Edit",
                    icon: <Edit className="h-4 w-4" />,
                    onClick: (role) => {
                      setSelectedRole(role);
                      setShowEditDialog(true);
                    },
                    variant: "outline",
                  },
                  {
                    label: "Delete",
                    icon: <Trash2 className="h-4 w-4" />,
                    onClick: (role) => {
                      setSelectedRole(role);
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
      </Card>

      {/* Create Role Dialog */}
      <RoleDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreateRole}
      />

      {/* Edit Role Dialog */}
      {selectedRole && (
        <RoleDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSubmit={handleUpdateRole}
          initialData={selectedRole}
        />
      )}

      {/* Delete Role Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteRole}
        role={selectedRole}
      />
    </div>
  );
}
