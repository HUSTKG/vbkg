import { useState, useEffect } from "react";
import * as z from "zod";
import {
  ArrowLeft,
  Save,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AppForm,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ConfirmDialog,
  DataTable,
  Dialog,
  FieldConfig,
  ScrollArea,
  SimpleColumnDef,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@vbkg/ui";
import { useNavigate, useParams } from "react-router";

// Types for our data
interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  permissions: string[];
}

interface Permission {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  category: string;
}

interface User {
  id: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  roles: string[];
  avatar_url?: string;
  created_at: Date;
}

// Mock data
const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
    permissions: ["all:read", "all:write", "all:delete", "all:admin"],
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-02-15"),
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
    updated_at: new Date("2024-03-10"),
    permissions: ["data:read", "analytics:read", "analytics:write"],
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
    permissions: ["data:read", "pipelines:read", "analytics:read"],
  },
];

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

const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    full_name: "Admin User",
    is_active: true,
    roles: ["admin"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    created_at: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "john.doe@example.com",
    full_name: "John Doe",
    is_active: true,
    roles: ["developer", "viewer"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    created_at: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "jane.smith@example.com",
    full_name: "Jane Smith",
    is_active: true,
    roles: ["analyst", "viewer"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    created_at: new Date("2024-02-01"),
  },
];

// Mock API
const fetchRoles = async (): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles);
    }, 500);
  });
};

const fetchRole = async (id: number): Promise<Role | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = mockRoles.find((r) => r.id === id);
      resolve(role);
    }, 500);
  });
};

const fetchPermissions = async (): Promise<Permission[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPermissions);
    }, 500);
  });
};

const fetchUsersWithRole = async (roleName: string): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = mockUsers.filter((u) => u.roles.includes(roleName));
      resolve(users);
    }, 500);
  });
};

// Role schema
const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
});

// Add/Edit Role Dialog
const RoleFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof roleSchema>) => void;
  initialData?: Role;
}) => {
  const isEditMode = !!initialData;

  useEffect(() => {
    if (!isOpen) {
      // Reset form data when dialog closes
    }
  }, [isOpen]);

  // Form fields
  const roleFields: FieldConfig[] = [
    {
      name: "name",
      label: "Role Name",
      type: "text",
      required: true,
      placeholder: "Enter role name",
      description: "Unique name for this role",
      disabled: isEditMode, // Can't change role name after creation
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter role description",
      description: "Describe what this role is for and who should have it",
    },
  ];

  return (
    <Dialog
      title="Role Form"
      description="Create or edit a role"
      open={isOpen}
      onOpenChange={onClose}
    >
      <AppForm
        fields={roleFields}
        schema={roleSchema}
        onSubmit={onSubmit}
        defaultValues={
          initialData
            ? {
                name: initialData.name,
                description: initialData.description || "",
              }
            : undefined
        }
        submitButtonText={isEditMode ? "Save Changes" : "Create Role"}
        resetButton={true}
        buttons={
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Create Role"}
            </Button>
          </div>
        }
      />
    </Dialog>
  );
};

// Delete role dialog
const DeleteRoleDialog = ({
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
      message="Are you sure you want to delete this role?"
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={onConfirm}
    />
  );
};

// Permission Management component
const PermissionManager = ({
  role,
  permissions,
  onUpdatePermissions,
}: {
  role: Role;
  permissions: Permission[];
  onUpdatePermissions: (roleId: number, permissions: string[]) => void;
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role.permissions || [],
  );
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSelectedPermissions(role.permissions || []);
    setHasChanges(false);
  }, [role]);

  // Group permissions by category
  const permissionsByCategory = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  const handleTogglePermission = (permissionName: string) => {
    setSelectedPermissions((prev) => {
      let newPerms;
      if (prev.includes(permissionName)) {
        newPerms = prev.filter((p) => p !== permissionName);
      } else {
        newPerms = [...prev, permissionName];
      }
      setHasChanges(true);
      return newPerms;
    });
  };

  const handleSavePermissions = () => {
    onUpdatePermissions(role.id, selectedPermissions);
  };

  const handleSelectAll = (category: string) => {
    const categoryPermissions = permissionsByCategory[category].map(
      (p) => p.name,
    );
    const allSelected = categoryPermissions.every((p) =>
      selectedPermissions.includes(p),
    );

    if (allSelected) {
      // Deselect all in category
      setSelectedPermissions((prev) =>
        prev.filter((p) => !categoryPermissions.includes(p)),
      );
    } else {
      // Select all in category
      setSelectedPermissions((prev) => {
        const newPerms = [...prev];
        categoryPermissions.forEach((p) => {
          if (!newPerms.includes(p)) {
            newPerms.push(p);
          }
        });
        return newPerms;
      });
    }

    setHasChanges(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Role Permissions</h3>
        <Button onClick={handleSavePermissions} disabled={!hasChanges}>
          <Save className="mr-2 h-4 w-4" /> Save Permissions
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        Select the permissions that should be assigned to this role. Users with
        this role will be granted these permissions.
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <Accordion type="multiple" className="w-full">
          {Object.entries(permissionsByCategory).map(([category, perms]) => {
            const allSelected = perms.every((p) =>
              selectedPermissions.includes(p.name),
            );
            const someSelected = perms.some((p) =>
              selectedPermissions.includes(p.name),
            );

            return (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {allSelected ? (
                        <Button
                          size="icon"
                          className="h-6 w-6 bg-primary text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAll(category);
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      ) : someSelected ? (
                        <Button
                          size="icon"
                          className="h-6 w-6 bg-primary/30 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAll(category);
                          }}
                        >
                          <span className="h-3 w-3 bg-primary-foreground rounded-sm"></span>
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAll(category);
                          }}
                        >
                          <span className="h-3 w-3 rounded-sm border-2"></span>
                        </Button>
                      )}
                    </div>
                    <span>
                      {category} <Badge className="ml-2">{perms.length}</Badge>
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-8">
                    {perms.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start space-x-2"
                      >
                        <Checkbox
                          id={`perm-${permission.id}`}
                          checked={selectedPermissions.includes(
                            permission.name,
                          )}
                          onCheckedChange={() =>
                            handleTogglePermission(permission.name)
                          }
                        />
                        <div className="space-y-1">
                          <label
                            htmlFor={`perm-${permission.id}`}
                            className="font-medium cursor-pointer text-sm"
                          >
                            {permission.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>

      {hasChanges && (
        <div className="flex justify-end">
          <Button onClick={handleSavePermissions}>
            <Save className="mr-2 h-4 w-4" /> Save Permissions
          </Button>
        </div>
      )}
    </div>
  );
};

export default function RoleDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = id === "create";

  const [role, setRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [usersWithRole, setUsersWithRole] = useState<User[]>([]);
  const [loading, setLoading] = useState(!isCreateMode);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load permissions in both create and edit mode
        const permissionsData = await fetchPermissions();
        setPermissions(permissionsData);

        if (!isCreateMode && id) {
          // Load role and users with this role
          const roleId = parseInt(id as string, 10);
          const roleData = await fetchRole(roleId);

          if (roleData) {
            setRole(roleData);
            const usersData = await fetchUsersWithRole(roleData.name);
            setUsersWithRole(usersData);
          } else {
            toast("Error", {
              description: "Role not found",
              className: "bg-red-500 text-white",
            });
            navigate("/roles");
          }
        } else {
          // Create mode - provide empty role
          setRole({
            id: 0, // Will be assigned by server
            name: "",
            description: "",
            created_at: new Date(),
            permissions: [],
          });
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast("Error", {
          description: "Failed to load role data. Please try again.",
          className: "bg-red-500 text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id !== undefined) {
      loadData();
    }
  }, [id, navigate, isCreateMode]);

  const handleCreateRole = async (data: z.infer<typeof roleSchema>) => {
    try {
      // In a real app, make API call to create role
      // Here we mock it
      const newRole: Role = {
        id: Math.floor(Math.random() * 1000) + 100, // Mock ID generation
        name: data.name,
        description: data.description,
        created_at: new Date(),
        updated_at: new Date(),
        permissions: [],
      };

      setRole(newRole);
      setShowEditDialog(false);

      toast("Success", {
        description: `Role "${data.name}" created successfully.`,
      });

      // In real app, redirect to the new role's page
      // Here we just set isCreateMode to false
      navigate(`/roles/${newRole.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to create role:", error);
      toast("Error", {
        description: "Failed to create role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleUpdateRole = async (data: z.infer<typeof roleSchema>) => {
    if (!role) return;

    try {
      // In a real app, make API call to update role
      const updatedRole = {
        ...role,
        description: data.description,
        updated_at: new Date(),
      };

      setRole(updatedRole);
      setShowEditDialog(false);

      toast("Success", {
        description: "Role information updated successfully.",
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
    if (!role) return;

    try {
      // In a real app, make API call to delete role

      toast("Success", {
        description: `Role "${role.name}" deleted successfully.`,
      });

      navigate("/roles");
    } catch (error) {
      console.error("Failed to delete role:", error);
      toast("Error", {
        description: "Failed to delete role. Please try again.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleUpdatePermissions = async (
    roleId: number,
    permissions: string[],
  ) => {
    if (!role) return;

    try {
      // In a real app, make API call to update permissions
      const updatedRole = {
        ...role,
        permissions,
        updated_at: new Date(),
      };

      setRole(updatedRole);

      toast("Success", {
        description: "Role permissions updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update permissions:", error);
      toast("Error", {
        description: "Failed to update permissions. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // User columns for table
  const userColumns: SimpleColumnDef<User, any>[] = [
    {
      header: "User",
      accessorKey: "email",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {row?.full_name?.[0] || row?.email?.[0].toUpperCase()}
          </div>
          <div>
            <div className="font-medium">
              {row?.full_name || "Unnamed User"}
            </div>
            <div className="text-xs text-muted-foreground">{row?.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: (row) => (
        <Badge
          variant={row?.is_active ? "default" : "outline"}
          className={row?.is_active ? "bg-green-100 text-green-800" : ""}
        >
          {row?.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "All Roles",
      accessorKey: "roles",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row?.roles.map((role: string) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Member Since",
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

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button size="sm" onClick={() => navigate("/roles")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles
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

  if (!role && !isCreateMode) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button size="sm" onClick={() => navigate("/roles")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles
          </Button>
        </div>
        <Card>
          <CardContent className="py-10 text-center">
            <h2 className="text-xl font-semibold mb-2">Role Not Found</h2>
            <p className="text-muted-foreground">
              The requested role could not be found.
            </p>
            <Button className="mt-4" onClick={() => navigate("/roles")}>
              Return to Roles List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button size="sm" onClick={() => navigate("/roles")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles
        </Button>
      </div>

      {isCreateMode ? (
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Create New Role</h1>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight capitalize flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6" />
              {role?.name} Role
            </h1>
            <p className="text-muted-foreground mt-1">
              {role?.description || "No description provided"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowEditDialog(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Details
            </Button>
            <Button onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Role
            </Button>
          </div>
        </div>
      )}

      {isCreateMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Define the basic information for this role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppForm
              fields={[
                {
                  name: "name",
                  label: "Role Name",
                  type: "text",
                  required: true,
                  placeholder: "Enter role name",
                  description:
                    "Unique name for this role (e.g., 'admin', 'editor')",
                },
                {
                  name: "description",
                  label: "Description",
                  type: "textarea",
                  placeholder: "Enter role description",
                  description:
                    "Describe what this role is for and who should have it",
                },
              ]}
              schema={roleSchema}
              onSubmit={handleCreateRole}
              submitButtonText="Create Role"
              resetButton={true}
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="permissions">
          <TabsList>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="members">
              Members ({usersWithRole.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Manage which permissions are granted to users with this role.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {role && permissions.length > 0 && (
                  <PermissionManager
                    role={role}
                    permissions={permissions}
                    onUpdatePermissions={handleUpdatePermissions}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Role Members</CardTitle>
                <CardDescription>
                  Users who have been assigned the {role?.name} role.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersWithRole.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground mb-4">
                      No users have been assigned this role
                    </p>
                    <Button onClick={() => navigate("/users")}>
                      <Plus className="mr-2 h-4 w-4" /> Assign Role to Users
                    </Button>
                  </div>
                ) : (
                  <DataTable<User, any>
                    data={usersWithRole}
                    columns={userColumns}
                    showPagination={true}
                    showGlobalFilter={true}
                    actionsOptions={{
                      show: true,
                      position: "end",
                      actions: [
                        {
                          label: "View User",
                          icon: <ChevronRight className="h-4 w-4" />,
                          onClick: (user) => navigate(`/users/${user.id}`),
                          variant: "ghost",
                        },
                        {
                          label: "Remove Role",
                          icon: <X className="h-4 w-4" />,
                          onClick: (user) => {
                            // In a real app, would remove the role from this user
                            toast("Not Implemented", {
                              description:
                                "Role removal would be implemented here",
                            });
                          },
                          variant: "outline",
                          className: "text-red-600",
                        },
                      ],
                      showInDropdown: true,
                      dropdownLabel: "Actions",
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Edit Role Dialog */}
      {role && (
        <RoleFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSubmit={isCreateMode ? handleCreateRole : handleUpdateRole}
          initialData={!isCreateMode ? role : undefined}
        />
      )}

      {/* Delete Role Dialog */}
      <DeleteRoleDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteRole}
        role={role}
      />
    </div>
  );
}
